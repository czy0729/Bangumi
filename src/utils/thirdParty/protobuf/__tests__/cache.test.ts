/*
 * @Author: czy0729
 * @Date: 2026-08-23 21:12:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 21:44:50
 *
 * cache 真实行为测试：缓存 Map、inflight Promise 共享、失败重试、开发日志
 */
jest.mock('@src/config', () => ({
  DEV: true,
  LOG_LEVEL: 1
}))

import { cacheMap, get, promiseMap, runWithCache } from '../cache'

import type { Data } from '../types'

const NAME = 'anime'
const DATA: Data['anime'] = [
  { i: 1, o: [] },
  { i: 2, o: [1, 2] }
]
const OTHER: Data['anime'] = [{ i: 9, o: [] }]

beforeEach(() => {
  cacheMap.clear()
  promiseMap.clear()
})

describe('runWithCache', () => {
  it('无缓存时执行 factory，成功后写入缓存并清除进行中状态', async () => {
    const factory = jest.fn(() => Promise.resolve(DATA))

    await expect(runWithCache(NAME, factory)).resolves.toEqual(DATA)

    expect(factory).toHaveBeenCalledTimes(1)
    expect(cacheMap.get(NAME)).toEqual(DATA)
    expect(promiseMap.has(NAME)).toBe(false)
  })

  it('命中缓存时直接返回缓存，不再执行 factory', async () => {
    cacheMap.set(NAME, DATA)
    const factory = jest.fn(() => Promise.resolve(OTHER))

    await expect(runWithCache(NAME, factory)).resolves.toEqual(DATA)
    expect(factory).not.toHaveBeenCalled()
  })

  it('并发调用共享同一个进行中 Promise，factory 只执行一次', async () => {
    let resolveFactory: (value: Data['anime']) => void
    const factory = jest.fn(() => new Promise<Data['anime']>(resolve => (resolveFactory = resolve)))

    const first = runWithCache(NAME, factory)
    const second = runWithCache(NAME, factory)

    // 第二次调用复用同一个 Promise
    expect(first).toBe(second)
    expect(factory).toHaveBeenCalledTimes(1)

    resolveFactory!(DATA)
    await expect(first).resolves.toEqual(DATA)
    await expect(second).resolves.toEqual(DATA)

    // 完成后进行中状态清除，下次调用命中缓存
    expect(promiseMap.has(NAME)).toBe(false)
    expect(cacheMap.get(NAME)).toEqual(DATA)
  })

  it('失败时并发等待者共享同一个 rejection，且不写缓存', async () => {
    let rejectFactory: (error: Error) => void
    const factory = jest.fn(
      () => new Promise<Data['anime']>((_, reject) => (rejectFactory = reject))
    )

    const first = runWithCache(NAME, factory)
    const second = runWithCache(NAME, factory)
    const error = new Error('decode failed')
    rejectFactory!(error)

    await expect(first).rejects.toBe(error)
    await expect(second).rejects.toBe(error)
    expect(cacheMap.has(NAME)).toBe(false)
    expect(promiseMap.has(NAME)).toBe(false)
  })

  it('失败后可重试：下次调用重新执行 factory', async () => {
    let calls = 0
    const factory = jest.fn(() => {
      calls += 1
      if (calls === 1) return Promise.reject(new Error('network down'))
      return Promise.resolve(DATA)
    })

    await expect(runWithCache(NAME, factory)).rejects.toThrow('network down')
    expect(cacheMap.has(NAME)).toBe(false)

    await expect(runWithCache(NAME, factory)).resolves.toEqual(DATA)
    expect(factory).toHaveBeenCalledTimes(2)
    expect(cacheMap.get(NAME)).toEqual(DATA)
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
    const { logger } = require('../../../dev') as { logger: { log: any } }
    logger.log.mockClear()

    const logName = 'manga'
    cacheMap.set(logName, DATA)
    get(logName)
    get(logName)
    get(logName)

    expect(logger.log).toHaveBeenCalledTimes(1)
    expect(logger.log).toHaveBeenCalledWith('@utils/thirdParty/protobuf/cache', 'get', logName, DATA.length)
  })
})
