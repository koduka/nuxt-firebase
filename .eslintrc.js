module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'prettier'
  ],
  linterOptions: {
    exclude: ["node_modules/**"]
  },
  plugins: [
  ],
  // add your custom rules here
  rules: {}
}
