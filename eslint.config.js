const cypressPlugin = require('eslint-plugin-cypress');

module.exports = [
  {
    ignores: ['node_modules/**', 'cypress/reports/**', 'cypress/screenshots/**', 'cypress/videos/**', 'allure-results/**', 'allure-report/**'],
  },
  {
    files: ['**/*.js'],
    plugins: { cypress: cypressPlugin },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...cypressPlugin.environments.globals.globals,
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      ...cypressPlugin.configs.recommended.rules,
      'no-unused-vars': 'warn',
    },
  },
];
