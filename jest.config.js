/*
 * @Author: czy0729
 * @Date: 2026-05-10 17:22:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-18 19:40:00
 */
const path = require('path')

// 自研 mobx DEV 开关, 与 metro.config.js 共用同一份
const { MOBX_SELF } = require('./src/utils/thirdParty/mobx/switch')

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
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@stores/(.*)$': '<rootDir>/src/stores/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@tinygrail/(.*)$': '<rootDir>/src/screens/tinygrail/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    // 开关关闭时交回 node 解析 (官方 mobx)
    ...(MOBX_SELF ? { '^mobx$': '<rootDir>/src/utils/thirdParty/mobx' } : {}),
    '^mobx-react$': '<rootDir>/src/utils/thirdParty/observer',
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
