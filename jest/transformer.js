/*
 * @Author: czy0729
 * @Date: 2026-05-10 17:19:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 05:21:32
 */
const babel = require('@babel/core')

module.exports = {
  process(src, filename) {
    const result = babel.transformSync(src, {
      filename,
      configFile: false,
      babelrc: false,
      presets: [
        '@babel/preset-typescript',
        // 与 babel-preset-expo 的 automatic JSX runtime 对齐, 否则无 import React 的组件在单测渲染链会 React is not defined
        ['@babel/preset-react', { runtime: 'automatic' }]
      ],
      plugins: ['@babel/plugin-transform-modules-commonjs', 'babel-plugin-jest-hoist']
    })
    return { code: result.code }
  }
}
