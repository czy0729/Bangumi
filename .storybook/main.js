/*
 * @Author: czy0729
 * @Date: 2023-04-10 16:27:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-15 07:03:48
 */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  title: 'Bangumi 番组计划',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-react-native-web',
    {
      name: 'storybook-dark-mode',
      parameters: {
        defaultTheme: 'Dark'
      }
    }
  ],
  core: {
    builder: 'webpack5',
    options: {
      fsCache: true,
      lazyCompilation: true
    }
  },
  webpackFinal: async (config, { configType }) => {
    /** ========== 压缩代码 ========== */
    if (configType === 'PRODUCTION') {
      // 搜索 existingUglifyPlugin
      const existingUglifyPluginIndex = config.optimization.minimizer.findIndex(
        plugin =>
          plugin.constructor.name === 'TerserPlugin' ||
          plugin.constructor.name === 'UglifyJsPlugin'
      )

      if (existingUglifyPluginIndex > -1) {
        // 替换 existingUglifyPlugin
        config.optimization.minimizer.splice(
          existingUglifyPluginIndex,
          1,
          new UglifyJsPlugin()
        )
      } else {
        // 添加新的 UglifyJsPlugin
        config.optimization.minimizer.push(new UglifyJsPlugin())
      }
    }
    return config
  },
  framework: '@storybook/react'
}
