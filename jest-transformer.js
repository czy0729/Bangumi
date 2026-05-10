/*
 * @Author: czy0729
 * @Date: 2026-05-10 17:19:35
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-05-10 17:19:35
 */
const babel = require('@babel/core')

module.exports = {
  process(src, filename) {
    const result = babel.transformSync(src, {
      filename,
      configFile: false,
      babelrc: false,
      presets: ['@babel/preset-typescript', '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-modules-commonjs']
    })
    return { code: result.code }
  }
}
