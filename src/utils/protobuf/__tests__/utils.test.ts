/*
 * @Author: czy0729
 * @Date: 2026-05-13
 */
jest.mock('@src/config', () => ({
  DEV: false,
  LOG_LEVEL: 0
}))

jest.mock('../../dev', () => ({
  logger: { log: jest.fn() }
}))

import { cacheMap, get, isPromise, lockMap } from '../utils'

beforeEach(() => {
  cacheMap.clear()
  lockMap.clear()
})

describe('isPromise', () => {
  it('返回 true 对于 Promise 对象', () => {
    expect(isPromise(Promise.resolve())).toBe(true)
    expect(isPromise(new Promise(() => {}))).toBe(true)
  })

  it('返回 true 对于 thenable 对象', () => {
    expect(isPromise({ then: () => {} })).toBe(true)
  })

  it('返回 false 对于非 Promise', () => {
    expect(isPromise(null)).toBe(false)
    expect(isPromise(undefined)).toBe(false)
    expect(isPromise(42)).toBe(false)
    expect(isPromise('string')).toBe(false)
    expect(isPromise({})).toBe(false)
  })
})

// describe('checkCache', () => {
//   it('有缓存时直接返回缓存值', () => {
//     cacheMap.set('anime', [1, 2, 3])
//     expect(checkCache('anime')).toEqual([1, 2, 3])
//   })

//   it('无缓存无锁时返回 true 并加锁', () => {
//     const result = checkCache('manga')
//     expect(result).toBe(true)
//     expect(lockMap.get('manga')).toBe(true)
//   })

//   it('有锁无缓存时返回 Promise 等待解锁', () => {
//     lockMap.set('game', true)
//     // 不设置缓存，模拟锁已存在但数据还没加载完

//     const result = checkCache('game')
//     expect(typeof (result as any).then).toBe('function')
//   })

//   // 验证问题1: 内存泄漏 - setInterval 无超时机制
//   it('[问题] 锁永远不释放时 Promise 永远挂起，setInterval 无法清除', async () => {
//     jest.useFakeTimers()

//     lockMap.set('test', true)
//     // 不设置缓存，模拟锁永远不释放

//     const promise = checkCache('test')
//     let resolved = false
//     promise.then(() => {
//       resolved = true
//     })

//     // 推进时间，interval 持续运行
//     jest.advanceTimersByTime(5000)

//     // Promise 永远不会 resolve
//     expect(resolved).toBe(false)

//     jest.useRealTimers()
//   })

//   // 验证问题2: 竞态条件
//   it('[问题] 并发调用可能同时获得锁', () => {
//     // 第一次调用获得锁
//     const result1 = checkCache('race')
//     expect(result1).toBe(true)

//     // 第二次调用时锁已存在，应该返回 Promise
//     const result2 = checkCache('race')
//     expect(typeof (result2 as any).then).toBe('function')
//   })
// })

describe('get', () => {
  it('有缓存时返回数据', () => {
    cacheMap.set('anime', [1, 2, 3])
    expect(get('anime')).toEqual([1, 2, 3])
  })

  it('无缓存时返回 undefined', () => {
    expect(get('manga')).toBeUndefined()
  })
})
