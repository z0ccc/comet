module.exports = {
  env: {
    browser: true,
    es2021: true,
    webextensions: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-plusplus': 'off',
    'comma-dangle': 'off',
    'operator-linebreak': 'off',
    'no-undef': 'off',
    'no-use-before-define': 'off',
  },
};
