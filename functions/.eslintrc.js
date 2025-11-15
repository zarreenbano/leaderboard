// functions/.eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2022,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // Turn off common errors during deploy
    '@typescript-eslint/no-unused-vars': 'off',
    'no-console': 'off',
    'import/no-unresolved': 'off',
  },
};