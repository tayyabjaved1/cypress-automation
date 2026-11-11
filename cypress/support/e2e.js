import registerCypressGrep from '@cypress/grep';
import '@testing-library/cypress/add-commands';
import 'cypress-mochawesome-reporter/register';
import '@shelex/cypress-allure-plugin';
import './commands';

// A bare `import '@cypress/grep'` does nothing -- its support module exports
// a function (it patches `it`/`describe` to honor { tags }), it doesn't run
// as an import side-effect. Verified live: every spec ran regardless of
// --env grepTags until this call was added.
registerCypressGrep();

// Deliberately NOT suppressing uncaught:exception globally (the common
// boilerplate pattern). Verified live that doing so hides real app crashes:
// a blanket `Cypress.on('uncaught:exception', () => false)` let a genuine
// react-datepicker crash (`Cannot read properties of null (reading
// 'getMonth')`, triggered by PracticeFormPage clearing that field) pass
// silently into a blank-page "element not found" failure instead of
// reporting the real error — exactly the "assert real behaviour, never just
// green" principle in docs/ARCHITECTURE.md. Letting the default behaviour
// (fail the test) stand means a real site crash is never mistaken for a
// flaky selector.
