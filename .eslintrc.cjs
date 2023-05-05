/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    "plugin:prettier/recommended",
    "eslint-config-prettier",
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  "plugins": [
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
