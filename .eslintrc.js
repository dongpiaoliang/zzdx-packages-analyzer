module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'prettier'
    // eslint-config-prettier 的缩写
  ],
  globals: {
    NodeJS: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true
    }
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.vue'],
      rules: {
        'no-undef': 'off'
      }
    }
  ],
  plugins: [],
  rules: {
    semi: [2, 'never'],
    'no-unused-vars': 'off',
    // 不使用分号
    'no-const-assign': 2,
    // 不能修改使用const关键字声明的变量
    'no-mixed-spaces-and-tabs': 2,
    // 不允许使用混合空格和制表符进行缩进
    'no-multiple-empty-lines': [
      2,
      {
        max: 1
      }
    ],
    // 最多一个空行
    'space-infix-ops': 2,
    // 强制二元运算符左右各有一个空格
    'no-empty-pattern': 2,
    // 不允许空块语句
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 生成器中'*'两侧都要有间距
    'use-isnan': 2,
    // 禁止比较时使用NaN，只能用isNaN()
    'no-with': 2,
    // 禁用with
    'no-var': 2,
    // 禁用var
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'no-useless-escape': 0,
    // 禁用不必要的转义字符
    'no-unreachable': 2,
    // 不允许可达代码return，throw，continue，和break语句后面还有语句
    'comma-dangle': [2, 'never'],
    // 逗号不使用悬挂
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    // 逗号间距
    'comma-style': [2, 'last'],
    // （默认）与数组元素，对象属性或变量声明在同一行之后和同一行需要逗号,
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}
