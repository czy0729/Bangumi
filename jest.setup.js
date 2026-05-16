/*
 * @Author: czy0729
 * @Date: 2026-05-17
 */

// 全局 mock，避免每个测试文件重复声明
jest.mock('expo-asset', () => ({}))
jest.mock('expo-haptics', () => ({}))
jest.mock('mobx', () => ({
  isObservableArray: () => false
}))
jest.mock('@constants/device', () => ({
  WEB: false
}))

jest.mock(__dirname + '/src/utils/dev', () => ({
  __esModule: true,
  globalLog: jest.fn(),
  globalWarn: jest.fn(),
  rerender: jest.fn(),
  logger: {
    warn: jest.fn(),
    error: jest.fn()
  }
}))
