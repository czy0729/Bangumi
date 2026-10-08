/*
 * @Author: czy0729
 * @Date: 2026-05-10 17:22:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-10 17:22:21
 */
const path = require('path')

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
  transformIgnorePatterns: [
    '/node_modules/(?!expo-*)'
  ],
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
