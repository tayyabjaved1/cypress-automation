import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const base = process.env.GITHUB_BASE_REF
  ? `origin/${process.env.GITHUB_BASE_REF}`
  : (process.env.DOCS_BASE_REF || 'HEAD^');

let changed;
try {
  changed = execFileSync('git', ['diff', '--name-only', `${base}...HEAD`], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).split(/\r?\n/).filter(Boolean);
} catch {
  console.error(`Could not compare changes against '${base}'. Fetch the base branch or set DOCS_BASE_REF.`);
  process.exit(2);
}

if (changed.length === 0) {
  console.log('Documentation check: no changed files detected.');
  process.exit(0);
}

const changedSet = new Set(changed);
const hasAny = (...paths) => paths.some((path) => changedSet.has(path));
const requirements = [];
const add = (condition, message) => { if (condition) requirements.push(message); };

const specsChanged = changed.some((p) => /^cypress\/e2e\/.*\.cy\.js$/.test(p));
const factoriesChanged = changed.some((p) => /^cypress\/support\/data\//.test(p));
const moduleCodeChanged = changed.some((p) => /^cypress\/pages\//.test(p));
const configChanged = changed.some((p) => ['cypress.config.js', 'package.json', 'package-lock.json', '.env.example'].includes(p) || p.startsWith('.github/workflows/'));

add(specsChanged && !hasAny('docs/TEST_CATALOG.md'), 'Spec changes require docs/TEST_CATALOG.md.');
add(specsChanged && !hasAny('docs/TRACEABILITY.md'), 'Spec changes require docs/TRACEABILITY.md.');
add(factoriesChanged && !hasAny('docs/DATA_FACTORY_GUIDE.md'), 'Factory/builder changes require docs/DATA_FACTORY_GUIDE.md.');
add(factoriesChanged && !hasAny('docs/FACTORY_CATALOG.md'), 'Factory/builder changes require docs/FACTORY_CATALOG.md.');
add(moduleCodeChanged && !hasAny('docs/MODULE_CATALOG.md'), 'Module changes require docs/MODULE_CATALOG.md.');
add(configChanged && !hasAny('README.md'), 'Configuration/CI/dependency changes require README.md.');
add(configChanged && !hasAny('docs/CONFIGURATION.md'), 'Configuration/CI/dependency changes require docs/CONFIGURATION.md.');

if (requirements.length > 0) {
  console.error('\nDocumentation check failed. Update the required docs in this same change:\n');
  for (const item of requirements) console.error(`  - ${item}`);
  console.error('\nIf this is a genuinely non-behavioral change, use the docs-not-required PR label and document the reason in the PR.');
  process.exit(1);
}

const missingFiles = [
  'docs/DOCUMENTATION_POLICY.md',
  'docs/CHANGE_IMPACT_MATRIX.md',
  'docs/TEST_CATALOG.md',
  'docs/TRACEABILITY.md',
].filter((path) => !existsSync(path));
if (missingFiles.length) {
  console.error(`Documentation governance files are missing: ${missingFiles.join(', ')}`);
  process.exit(1);
}

console.log('Documentation check passed for changed source files.');
