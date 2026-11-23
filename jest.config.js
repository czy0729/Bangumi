/*
 * @Author: czy0729
 * @Date: 2026-05-10 17:22:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-18 19:40:00
 */
const path = require('path')

// 自研第三方替换开关, 与 metro.config.js / .storybook/main.js 共用同一份; 切换后重跑 jest 即可
const { MOBX_SELF, RENDER_HTML_SELF } = require('./src/utils/thirdParty/switch')

// expo-file-system < SDK 53 无 /legacy 子路径, 旧 API 即根入口 (判定同 metro.config.js)
let fileSystemLegacyMapper = {}
try {
  require.resolve('expo-file-system/legacy')
} catch {
  fileSystemLegacyMapper = {
    '^expo-file-system/legacy$': '<rootDir>/node_modules/expo-file-system'
  }
}

module.exports = {
  globals: {
    __DEV__: true
  },
  setupFiles: ['./jest/setup.js'],
  transform: {
    '^.+\\.[jt]sx?$': path.resolve(__dirname, 'jest/transformer.js')
  },
  transformIgnorePatterns: ['/node_modules/(?!expo-*)'],
  moduleNameMapper: {
    '^.+\\.(png|jpg|jpeg|gif|webp)$': '<rootDir>/jest/mocks/fileMock.js',
    '^@_$': '<rootDir>',
    '^@/(.*)$': '<rootDir>/$1',
    '^@_/(.*)$': '<rootDir>/src/screens/_/$1',
    '^@assets$': '<rootDir>/src/assets',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@components$': '<rootDir>/src/components',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@constants$': '<rootDir>/src/constants',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@screens$': '<rootDir>/src/screens',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@stores$': '<rootDir>/src/stores',
    '^@stores/(.*)$': '<rootDir>/src/stores/$1',
    '^@styles$': '<rootDir>/src/styles',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@tinygrail$': '<rootDir>/src/screens/tinygrail',
    '^@tinygrail/(.*)$': '<rootDir>/src/screens/tinygrail/$1',
    '^@types$': '<rootDir>/src/types',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@utils$': '<rootDir>/src/utils',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    // 开关关闭时交回 node 解析 (官方 mobx)
    ...(MOBX_SELF ? { '^mobx$': '<rootDir>/src/utils/thirdParty/mobx' } : {}),
    // @render-html-parser: 自研 / htmlparser2 (DEV 开关)
    '^@render-html-parser$': `<rootDir>/src/components/render-html/html-parser/${
      RENDER_HTML_SELF ? 'self' : 'legacy'
    }`,
    '^mobx-react$': '<rootDir>/src/utils/thirdParty/observer',
    '^@src$': '<rootDir>/src',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^react-native$': '<rootDir>/jest/mocks/react-native.js',
    '^expo-web-browser$': '<rootDir>/jest/mocks/expo-web-browser.js',
    '^expo-modules-core(/.*)?$': '<rootDir>/jest/mocks/expo-modules-core.js',
    ...fileSystemLegacyMapper
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/web/', '/test/', '/__tests__/fixtures/']
}
