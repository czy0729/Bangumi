/*
 * @Author: czy0729
 * @Date: 2023-04-10 16:27:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-06 06:19:49
 */
const { GenerateSW } = require('workbox-webpack-plugin')
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
    config.resolve.alias = {
      ...config.resolve.alias,
      stream: require.resolve('stream-browserify')
    }

    /** ========== Workbox ========== */
    if (configType === 'PRODUCTION') {
      config.plugins.push(
        new GenerateSW({
          swDest: 'service-worker.js',
          clientsClaim: true,
          skipWaiting: true,
          runtimeCaching: [
            {
              urlPattern: /\.(png|jpe?g|gif|svg)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images',
                expiration: {
                  maxEntries: 1000,
                  maxAgeSeconds: 60 * 60 * 24 * 30
                }
              }
            },
            {
              urlPattern: /\.(ttf|woff|woff2|eot)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'fonts',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30
                }
              }
            }
          ],
          maximumFileSizeToCacheInBytes: 15 * 1024 * 1024
        })
      )
    }

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

      // config.performance = {
      //   hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
      //   maxAssetSize: 1024 * 1024, // 限制单个文件大小为 1MB
      //   maxEntrypointSize: 1024 * 1024 // 限制整体打包后的文件大小为 1MB
      // }

      // 设置 optimization 分割代码
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 1024 * 1024
      }
    }

    return config
  },
  framework: '@storybook/react'
}
