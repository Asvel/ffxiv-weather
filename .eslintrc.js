module.exports = {
  extends: [
    'alloy',
    'alloy/typescript',
    'plugin:solid/typescript',
  ],
  env: {
    browser: true,
  },
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: [
    'solid',
  ],
  rules: {
    'no-restricted-globals': ['error', ...require('confusing-browser-globals')],
    'no-return-assign': 'off',  // typescript will catch the mistyped ==
    'complexity': 'off',
    'max-depth': 'off',
    'max-nested-callbacks': 'off',
    'max-params': 'off',
    'prefer-const': ['error', { 'destructuring': 'all' }],
    'solid/prefer-for': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/require-array-sort-compare': 'error',

    // stylistic
    'no-multi-spaces': ['error', { 'ignoreEOLComments': true }],
    'comma-dangle': ['error', 'always-multiline'],
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'semi': 'error',
    'spaced-comment': 'off',  // too many /*@once*/
  },
  reportUnusedDisableDirectives: true,
};
