/*
 * @Author: czy0729
 * @Date: 2026-10-08 13:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-08 22:48:09
 */
const mockWithTiming = jest.fn((...args: [number, ...unknown[]]) => ({ __timing: args[0] }))
const mockScheduleOnRN = jest.fn((fn: (...args: unknown[]) => void, ...args: unknown[]) =>
  fn(...args)
)

// 供 mock 工厂延迟读取 (关闭动画时模块加载期即取值, 需 resetModules 后重新 require)
let mockReducedMotion = false

jest.mock('react-native-reanimated', () => ({
  useReducedMotion: () => mockReducedMotion,
  withTiming: mockWithTiming
}))

// worklets 封装依赖 react-native-worklets, 单测内直接执行回调
jest.mock('../../worklets', () => ({
  scheduleOnRN: (fn, ...args) => mockScheduleOnRN(fn, ...args)
}))

describe('timing', () => {
  beforeEach(() => {
    mockReducedMotion = false
    mockWithTiming.mockClear()
    mockScheduleOnRN.mockClear()
    jest.resetModules()
  })

  afterAll(() => {
    jest.resetModules()
  })

  it('系统动画正常时等价于 withTiming, 不提前回调', () => {
    const { isAnimationDisabled, timing } = require('../index')

    expect(isAnimationDisabled()).toBe(false)

    const callback = jest.fn()
    expect(timing(1, { duration: 250 }, callback)).toEqual({ __timing: 1 })
    expect(mockWithTiming).toHaveBeenCalledTimes(1)
    expect(callback).not.toHaveBeenCalled()
  })

  it('系统动画正常时, 回调经包装后仍能送达', () => {
    const { timing } = require('../index')

    const callback = jest.fn()
    timing(1, { duration: 250 }, callback)

    const wrapped = mockWithTiming.mock.calls[0][2] as (finished: boolean) => void
    expect(typeof wrapped).toBe('function')

    wrapped(true)
    expect(mockScheduleOnRN).toHaveBeenCalledWith(callback, true)
    expect(callback).toHaveBeenCalledWith(true)
  })

  it('系统关闭动画时直接返回终值并同步回调, 不创建动画', () => {
    mockReducedMotion = true
    jest.resetModules()

    const { isAnimationDisabled, timing } = require('../index')

    expect(isAnimationDisabled()).toBe(true)

    const callback = jest.fn()
    expect(timing(0, { duration: 250 }, callback)).toBe(0)
    expect(callback).toHaveBeenCalledWith(true)
    expect(mockWithTiming).not.toHaveBeenCalled()
  })
})
