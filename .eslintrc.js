/*
 * @Author: czy0729
 * @Date: 2019-03-13 05:15:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-27 10:27:03
 */
module.exports = {
  root: true,
  globals: {
    XMLHttpRequest: true,
    fetch: true, // react-native的fetch
    log: true, // 测试打印函数, 能规避循环引用
    warn: true,
    require: true,
    requestAnimationFrame: true
  },
  env: {
    commonjs: true,
    es6: true
  },

  // https://npm.taobao.org/package/babel-eslint
  // babel-eslint 你使用 babel-eslint 的唯一理由就是你在使用类型检查工具,
  // 比如Flow, 抑或使用了一些Babel支持的实验性的 但Eslint 还不支持的语法 。
  parser: 'babel-eslint',

  // https://npm.taobao.org/package/eslint-plugin-babel
  // eslint-plugin-babel 解决babel-eslint不能解决的使内置规则支持实验性语法特性的问题,
  // 总之这是一款和 babel-eslint 配套使用的 eslint 规则插件。
  plugins: ['babel'],

  // https://npm.taobao.org/package/eslint-config-airbnb
  // airbnb 高度集成了 eslint, eslint-plugin-import, eslint-plugin-react, eslint-plugin-jsx-a11y

  // https://npm.taobao.org/package/eslint-plugin-import
  // eslint-plugin-import 旨在解决 ES6 中 import/export 语法问题, 和路径太长易拼错的问题。

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
  // 0: off, 1: warn, 2: error
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'class-methods-use-this': 0,
    'comma-dangle': ['error', 'never'],
    'function-paren-newline': 0, // 有时候一行过长, 格式化后括号换行不是预期
    'global-require': 0,
    'implicit-arrow-linebreak': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/order': 0,
    'import/prefer-default-export': 0,
    'linebreak-style': ['error', 'unix'],
    'lines-between-class-members': 0,
    'max-len': ['error', 200],
    'no-confusing-arrow': 0, // 允许三元JSX结构
    'no-console': 0, // 方便开发
    'no-mixed-operators': 0,
    'no-nested-ternary': 0, // 允许三元
    'no-return-assign': 0, // return 不允许赋值, 与react的ref冲突
    'no-shadow': 0, // 解构需要, 比如 const { getUser } = this.props
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'prefer-destructuring': 0, // 不要求一定要析构
    camelcase: 0, // UNSAFE_componentWillReceiveProps
    eqeqeq: 0, // 不要求使用全等
    experimentalDecorators: 0,
    indent: 0, // 经常与三元表达的自动格式化冲突, 所以关闭
    quotes: ['error', 'single'],
    radix: 0, // parseInt()不需要写进制
    semi: 0, // 不要分号

    // https://github.com/yannickcr/eslint-plugin-react
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'react/jsx-indent': ['error', 2], // Validate JSX indentation
    'react/jsx-indent-props': ['error', 2], // Validate props indentation in JSX
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-wrap-multilines': 0,
    'react/no-multi-comp': 0,
    'react/prop-types': 0, // Prevent missing props validation in a React component definition
    'react/sort-comp': 0,
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,

    // https://github.com/evcohen/eslint-plugin-jsx-a11y
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: [''],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton']
      }
    ],

    // 下面屏蔽的都是一些web端辅助元素属性, 如aria-*
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-ally/interactive-supports-focus': 0,
    'jsx-quotes': 0 // 单引号
  }
}
