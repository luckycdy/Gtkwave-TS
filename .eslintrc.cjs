require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-typescript/recommended',
    'plugin:vue/vue3-recommended',
    // 'plugin:prettier/recommended',
    // '@vue/eslint-config-prettier',
    // '@vue/eslint-config-prettier/skip-formatting',
    'eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
}
