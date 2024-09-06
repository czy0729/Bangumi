/*
 * @Author: czy0729
 * @Date: 2023-04-10 16:27:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-05 21:30:35
 */
const path = require('path')
const sass = require('node-sass')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const serviceWorker = true
const analyzer = false

module.exports = {
  title: 'Bangumi 番组计划',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    // '@storybook/addon-actions',
    // '@storybook/addon-links',
    // '@storybook/addon-essentials',
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
      lazyCompilation: true,
      cache: {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename]
        }
      }
    }
  },
  framework: '@storybook/react',
  previewHead: head => {
    const isProduction = process.env.NODE_ENV === 'production'
    if (!isProduction) return head

    const prefix = isProduction ? 'production.min' : 'development'
    return `
      ${head}
      <script src="https://unpkg.com/react@18.1.0/umd/react.${prefix}.js" crossorigin="anonymous"></script>
      <script src="https://unpkg.com/react-dom@18.1.0/umd/react-dom.${prefix}.js" crossorigin="anonymous"></script>
    `
  },
  webpackFinal: async (config, { configType }) => {
    /** ========== SASS ========== */
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: 'thread-loader',
          options: {
            workers: 2 // 根据需要设置工作线程数
          }
        },
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
              return /\.(bin|proto|ico|json|jpg|woff2)$/.test(resourcePath)
            }
          }
        ]
      })
    )

    if (configType === 'PRODUCTION') {
      config.externals = {
        react: 'React',
        'react-dom': 'ReactDOM'
      }

      /** ========== ServiceWorker Workbox ========== */
      if (serviceWorker) {
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

      /** ========== webpack-bundle-analyzer ========== */
      if (analyzer) {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'report.html'
          })
        )
      }

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
