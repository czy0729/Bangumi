/*
 * @Author: czy0729
 * @Date: 2026-05-10 17:22:21
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-05-10 17:22:21
 */
const path = require('path')

module.exports = {
  globals: {
    __DEV__: true
  },
  setupFiles: ['./jest.setup.js'],
  transform: {
    '^.+\\.[jt]sx?$': path.resolve(__dirname, 'jest-transformer.js')
  },
  transformIgnorePatterns: [
    '/node_modules/(?!p-limit|yocto-queue|expo-*)'
  ],
  moduleNameMapper: {
    '^.+\\.(png|jpg|jpeg|gif|webp)$': '<rootDir>/__mocks__/fileMock.js',
    '^@_$': '<rootDir>',
    '^@/(.*)$': '<rootDir>/$1',
    '^@_/(.*)$': '<rootDir>/src/screens/_/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@constants/constants$': '<rootDir>/__mocks__/constants.js',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@stores/(.*)$': '<rootDir>/src/stores/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@tinygrail/(.*)$': '<rootDir>/src/screens/tinygrail/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^react-native$': '<rootDir>/__mocks__/react-native.js',
    '^expo-web-browser$': '<rootDir>/__mocks__/expo-web-browser.js',
    '^expo-modules-core(/.*)?$': '<rootDir>/__mocks__/expo-modules-core.js'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/web/', '/test/']
}
