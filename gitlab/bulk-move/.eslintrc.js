module.exports = {
  extends: 'standard-with-typescript',
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {}
}
