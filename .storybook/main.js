/*
 * @Author: czy0729
 * @Date: 2023-04-10 16:27:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-14 12:00:27
 */
const path = require('path')
const sass = require('node-sass')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

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
  framework: '@storybook/react',
  webpackFinal: async (config, { configType }) => {
    /** ========== SASS ========== */
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        // 如果需要将样式注入到编译后的组件中，取消注释此行
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: sass
          }
        }
      ]
    })

    config.resolve.alias = {
      ...config.resolve.alias,
      stream: require.resolve('stream-browserify')
    }

    /** ========== Public Assets ========== */
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../src/assets'),
            to: 'assets',
            filter: resourcePath => {
              return /\.(bin|proto|ico)$/.test(resourcePath)
            }
          }
        ]
      })
    )

    /** ========== ServiceWorker Workbox ========== */
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
            },
            {
              urlPattern: /\.(proto|bin)$/,
              handler: 'NetworkFirst'
            }
          ],
          maximumFileSizeToCacheInBytes: 15 * 1024 * 1024
        })
      )
    }

    if (configType === 'PRODUCTION') {
      /** ========== 压缩代码 ========== */
      // Replace or add TerserPlugin
      const existingTerserPluginIndex = config.optimization.minimizer.findIndex(
        plugin => plugin.constructor.name === 'TerserPlugin'
      )

      if (existingTerserPluginIndex > -1) {
        config.optimization.minimizer.splice(existingTerserPluginIndex, 1, new TerserPlugin())
      } else {
        config.optimization.minimizer.push(new TerserPlugin())
      }

      /** ========== 分割代码 ========== */
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 1024 * 1024
      }
    }

    return config
  }
}
