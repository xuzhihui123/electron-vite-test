module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'plugin:vue/vue3-recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    semi: [2, 'never'], // 禁止尾部使用分号“ ; ”
    'no-var': 'error', // 禁止使用 var
    indent: ['error', 2], // 缩进2格
    'no-mixed-spaces-and-tabs': 'error', // 不能空格与tab混用
    quotes: [2, 'single'], // 使用单引号
    // 'vue/html-closing-bracket-newline': 'off', // 不强制换行
    // 'vue/singleline-html-element-content-newline': 'off', // 不强制换行
    // 'vue/max-attributes-per-line': ['error', {
    //   singleline: { max: 5 },
    //   multiline: { max: 5 }
    // }]
    'vue/multi-word-component-names': ['off', {
      ignores: []
    }],
    'vue/no-multiple-template-root': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    'padded-blocks': ['off'],
    'prefer-const': ['off']
  }
}
