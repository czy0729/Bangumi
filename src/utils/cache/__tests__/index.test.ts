/*
 * @Author: czy0729
 * @Date: 2026-09-07 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-07 23:50:27
 */
import { ensureArrayLimit, ensureCacheLimit, ensureRecordLimit } from '../index'

describe('ensureCacheLimit', () => {
  it('未超过上限时不淘汰', () => {
    const cache = new Map<string, number>()
    cache.set('a', 1)
    cache.set('b', 2)

    ensureCacheLimit(cache, 5)

    expect(cache.size).toBe(2)
    expect(cache.get('a')).toBe(1)
  })

  it('超过上限时淘汰最早写入的条目', () => {
    const cache = new Map<string, number>()
    cache.set('a', 1)
    cache.set('b', 2)
    cache.set('c', 3)

    ensureCacheLimit(cache, 2)

    expect(cache.has('a')).toBe(false)
    expect(Array.from(cache.keys())).toEqual(['b', 'c'])
  })

  it('单次调用即收敛到上限, 保留最后写入的条目', () => {
    const cache = new Map<string, number>()
    cache.set('a', 1)
    cache.set('b', 2)
    cache.set('c', 3)
    cache.set('d', 4)

    ensureCacheLimit(cache, 2)

    expect(cache.size).toBe(2)
    expect(Array.from(cache.keys())).toEqual(['c', 'd'])
  })

  it('默认上限为 100', () => {
    const cache = new Map<number, number>()
    for (let i = 0; i < 100; i += 1) cache.set(i, i)

    ensureCacheLimit(cache)

    expect(cache.size).toBe(100)

    cache.set(100, 100)
    ensureCacheLimit(cache)

    expect(cache.size).toBe(100)
    expect(cache.has(0)).toBe(false)
  })

  it('支持 Set, 淘汰最早写入的值', () => {
    const cache = new Set<string>()
    cache.add('a')
    cache.add('b')
    cache.add('c')

    ensureCacheLimit(cache, 2)

    expect(cache.has('a')).toBe(false)
    expect(Array.from(cache.values())).toEqual(['b', 'c'])
  })

  it('空缓存不报错', () => {
    const cache = new Map<string, number>()

    expect(() => ensureCacheLimit(cache, 0)).not.toThrow()
    expect(cache.size).toBe(0)
  })
})

describe('ensureArrayLimit', () => {
  it('未超过上限时不裁剪', () => {
    const list = [1, 2, 3]

    ensureArrayLimit(list, 5)

    expect(list).toEqual([1, 2, 3])
  })

  it('超过上限时从尾部裁剪, 保留最早写入项', () => {
    const list = [1, 2, 3, 4, 5]

    ensureArrayLimit(list, 3)

    expect(list).toEqual([1, 2, 3])
  })

  it('原地修改并返回同一引用', () => {
    const list = [1, 2, 3, 4]

    expect(ensureArrayLimit(list, 2)).toBe(list)
    expect(list).toEqual([1, 2])
  })

  it('默认上限为 100', () => {
    const list = Array.from({ length: 100 }, (_, index) => index)

    ensureArrayLimit(list)

    expect(list).toHaveLength(100)

    list.push(100)
    ensureArrayLimit(list)

    expect(list).toHaveLength(100)
    expect(list[99]).toBe(99)
  })

  it('空数组不报错', () => {
    const list: number[] = []

    expect(() => ensureArrayLimit(list, 0)).not.toThrow()
    expect(list).toEqual([])
  })

  it('keepTail 时从头部裁剪, 保留最新写入项', () => {
    const list = [1, 2, 3, 4, 5]

    ensureArrayLimit(list, 3, true)

    expect(list).toEqual([3, 4, 5])
  })

  it('keepTail 且未超限时不裁剪', () => {
    const list = [1, 2, 3]

    ensureArrayLimit(list, 5, true)

    expect(list).toEqual([1, 2, 3])
  })
})

describe('ensureRecordLimit', () => {
  it('未超过上限时不淘汰', () => {
    const record: Record<string, number> = { a: 1, b: 2 }

    ensureRecordLimit(record, 5)

    expect(Object.keys(record)).toEqual(['a', 'b'])
  })

  it('超过上限时按插入顺序淘汰最早的键', () => {
    const record: Record<string, number> = { a: 1, b: 2, c: 3 }

    ensureRecordLimit(record, 2)

    expect(record).toEqual({ b: 2, c: 3 })
  })

  it('单次调用即收敛到上限', () => {
    const record: Record<string, number> = { a: 1, b: 2, c: 3, d: 4 }

    ensureRecordLimit(record, 2)

    expect(Object.keys(record)).toEqual(['c', 'd'])
  })

  it('默认上限为 100', () => {
    const record: Record<string, number> = {}
    for (let i = 0; i < 100; i += 1) record[`k${i}`] = i

    ensureRecordLimit(record)

    expect(Object.keys(record)).toHaveLength(100)

    record.k100 = 100
    ensureRecordLimit(record)

    expect(Object.keys(record)).toHaveLength(100)
    expect(record.k0).toBeUndefined()
    expect(record.k100).toBe(100)
  })

  it('空对象不报错', () => {
    const record: Record<string, number> = {}

    expect(() => ensureRecordLimit(record, 0)).not.toThrow()
    expect(Object.keys(record)).toEqual([])
  })
})
