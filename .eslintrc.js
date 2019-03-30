/*
 * @Author: czy0729
 * @Date: 2019-03-13 05:15:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-17 02:50:21
 */
module.exports = {
  root: true,
  globals: {
    process: true,
    require: true,
    __DEV__: true
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  settings: {
    // 'import/resolver': {
    //   'babel-module': {},
    // },
    // 'import/core-modules': ['styled-jsx/css']
  },

  // https://npm.taobao.org/package/babel-eslint
  // babel-eslint 你使用 babel-eslint 的唯一理由就是你在使用类型检查工具，
  // 比如Flow，抑或使用了一些Babel支持的实验性的 但Eslint 还不支持的语法 。
  parser: 'babel-eslint',

  // https://npm.taobao.org/package/eslint-plugin-babel
  // eslint-plugin-babel 解决babel-eslint不能解决的使内置规则支持实验性语法特性的问题，
  // 总之这是一款和 babel-eslint 配套使用的 eslint 规则插件。
  plugins: ['babel'],

  // https://npm.taobao.org/package/eslint-config-airbnb
  // airbnb 高度集成了 eslint, eslint-plugin-import, eslint-plugin-react, eslint-plugin-jsx-a11y

  // https://npm.taobao.org/package/eslint-plugin-import
  // eslint-plugin-import 旨在解决 ES6 中 import/export 语法问题，和路径太长易拼错的问题。

  // https://github.com/yannickcr/eslint-plugin-react
  // eslint-plugin-react 一个指定的React 语法规则检查工具。

  // https://github.com/evcohen/eslint-plugin-jsx-a11y
  // eslint-plugin-jsx-a11y  对JSX 元素上可访问属性的静态检查 。
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },

  // https://eslint.org/docs/rules/
  // 0 1 2 -> off warn error
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'class-methods-use-this': 0,
    'comma-dangle': ['error', 'never'],
    'function-paren-newline': ['error', 'consistent'],
    'global-require': 0,
    'implicit-arrow-linebreak': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'linebreak-style': ['error', 'unix'],
    'lines-between-class-members': 0,
    'max-len': ['error', 200],
    'no-console': 0,
    'no-mixed-operators': 0,
    'no-nested-ternary': 0, // 不允许三元
    'no-return-assign': 0, // return 不允许赋值，于react的ref冲突
    'no-shadow': 0, // 解构需要，比如 const { getUser } = this.props
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    eqeqeq: 0,
    experimentalDecorators: 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    radix: 0,
    semi: 0,

    // https://github.com/yannickcr/eslint-plugin-react
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/jsx-indent': ['error', 2], // Validate JSX indentation
    'react/jsx-indent-props': ['error', 2], // Validate props indentation in JSX
    'react/prop-types': 0, // Prevent missing props validation in a React component definition
    'react/jsx-wrap-multilines': 0,
    // 'react/no-danger': 0, // Prevent usage of dangerous JSX properties
    // 'react/jsx-closing-tag-location': 0, // Validate closing tag location in JSX

    // new
    'react/jsx-one-expression-per-line': 0,
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': 0,
    'react/sort-comp': 0,
    'react/no-multi-comp': 0,

    // https://github.com/evcohen/eslint-plugin-jsx-a11y
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: [''],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton']
      }
    ],
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-ally/interactive-supports-focus': 0,
    'jsx-quotes': 0
  }
}
