module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'space-before-function-paren': 0,函数左边不要求空格
    // 默认缩进 import、export
    'indent': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
