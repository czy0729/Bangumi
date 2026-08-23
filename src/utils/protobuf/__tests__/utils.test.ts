/*
 * @Author: czy0729
 * @Date: 2026-08-23 21:12:11
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-23 21:12:11
 *
 * utils 真实行为测试：缓存 Map、并发锁、等待轮询、开发日志
 */
jest.mock('@src/config', () => ({
  DEV: true,
  LOG_LEVEL: 1
}))

import { cacheMap, checkCache, get, isPromise, lockMap } from '../utils'

const NAME = 'anime'
const DATA = [1, 2, 3]

beforeEach(() => {
  jest.useFakeTimers()
  cacheMap.clear()
  lockMap.clear()
})

afterEach(() => {
  jest.useRealTimers()
})

describe('isPromise', () => {
  it('Promise 实例返回 true', () => {
    expect(isPromise(Promise.resolve())).toBe(true)
    expect(isPromise(new Promise(() => {}))).toBe(true)
  })

  it('thenable 对象返回 true', () => {
    expect(isPromise({ then: () => {} })).toBe(true)
  })

  it('普通值返回 false', () => {
    expect(isPromise(null)).toBe(false)
    expect(isPromise(undefined)).toBe(false)
    expect(isPromise(42)).toBe(false)
    expect(isPromise('string')).toBe(false)
    expect(isPromise(true)).toBe(false)
    expect(isPromise({})).toBe(false)
    expect(isPromise(() => {})).toBe(false)
  })
})

describe('checkCache', () => {
  it('有缓存时直接同步返回缓存值，且不加锁', () => {
    cacheMap.set(NAME, DATA)

    const result = checkCache(NAME)
    expect(result).toEqual(DATA)
    expect(lockMap.has(NAME)).toBe(false)
  })

  it('无缓存无锁时返回 true 并写入锁', () => {
    expect(checkCache(NAME)).toBe(true)
    expect(lockMap.get(NAME)).toBe(true)
  })

  it('已锁定时返回等待 Promise，对方完成（写缓存+释放锁）后拿到缓存值', async () => {
    lockMap.set(NAME, true)

    const waiting = checkCache(NAME)
    expect(typeof (waiting as any)?.then).toBe('function')

    // 模拟持锁方完成
    cacheMap.set(NAME, DATA)
    lockMap.set(NAME, false)

    // 等待方以 800ms 为间隔轮询锁状态
    jest.advanceTimersByTime(800)
    await expect(waiting).resolves.toEqual(DATA)
  })

  it('已锁定但持锁方失败（只释放锁未写缓存）时，等待 Promise 以 undefined 结束', async () => {
    lockMap.set(NAME, true)

    const waiting = checkCache(NAME)
    lockMap.set(NAME, false)

    jest.advanceTimersByTime(800)
    await expect(waiting).resolves.toBeUndefined()
    expect(cacheMap.has(NAME)).toBe(false)
  })
})

describe('get', () => {
  it('命中缓存返回数据', () => {
    cacheMap.set(NAME, DATA)
    expect(get(NAME)).toEqual(DATA)
  })

  it('未命中返回 undefined', () => {
    expect(get('catalog')).toBeUndefined()
  })

  it('同一 name 仅首次调用输出开发日志', () => {
    const { logger } = require('../../dev') as { logger: { log: any } }
    logger.log.mockClear()

    const logName = 'manga'
    cacheMap.set(logName, DATA)
    get(logName)
    get(logName)
    get(logName)

    expect(logger.log).toHaveBeenCalledTimes(1)
    expect(logger.log).toHaveBeenCalledWith('@utils/protobuf/get', logName, DATA.length)
  })
})
