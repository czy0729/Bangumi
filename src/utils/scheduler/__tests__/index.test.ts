/*
 * @Author: czy0729
 * @Date: 2026-05-13
 */
jest.mock('@constants/device', () => ({
  WEB: false
}))

describe('postTask', () => {
  let postTask: typeof import('../index').postTask

  beforeEach(() => {
    jest.useFakeTimers()
    jest.resetModules()
    ;(global as any).window = {}

    postTask = require('../index').postTask
  })

  afterEach(() => {
    jest.useRealTimers()
    delete (global as any).window
  })

  it('支持 scheduler.postTask 时使用 scheduler', () => {
    const mockPostTask = jest.fn()
    ;(global as any).window = {
      scheduler: { postTask: mockPostTask }
    }

    postTask = require('../index').postTask
    const callback = jest.fn()

    postTask(callback, 100, 'user-visible')

    expect(mockPostTask).toHaveBeenCalledWith(callback, {
      delay: 100,
      priority: 'user-visible'
    })
  })

  it('background 优先级时延迟不小于 160ms', () => {
    const mockPostTask = jest.fn()
    ;(global as any).window = {
      scheduler: { postTask: mockPostTask }
    }

    postTask = require('../index').postTask
    const callback = jest.fn()

    postTask(callback, 50, 'background')

    expect(mockPostTask).toHaveBeenCalledWith(callback, {
      delay: 160,
      priority: 'background'
    })
  })

  it('不支持 scheduler 且 delay=0 时使用微任务', () => {
    const callback = jest.fn()

    postTask(callback, 0)

    expect(callback).not.toHaveBeenCalled()

    Promise.resolve().then(() => {
      expect(callback).toHaveBeenCalled()
    })
  })

  it('不支持 scheduler 且 delay>0 时使用 setTimeout', () => {
    const callback = jest.fn()

    postTask(callback, 200)

    expect(callback).not.toHaveBeenCalled()

    jest.advanceTimersByTime(200)

    expect(callback).toHaveBeenCalled()
  })

  it('不支持 scheduler 时使用默认延迟', () => {
    const callback = jest.fn()

    postTask(callback)

    jest.advanceTimersByTime(160)

    expect(callback).toHaveBeenCalled()
  })
})
