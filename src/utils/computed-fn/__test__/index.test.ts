/*
 * @Author: czy0729
 * @Date: 2026-08-08 22:01:58
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-08 22:01:58
 */
jest.unmock('mobx')

import { autorun, observable, runInAction } from 'mobx'
import { computedFn } from '../index'

describe('computedFn', () => {
  it('数字数组参数 String 后单射, 不同 id 集合不串缓存', () => {
    const fn = computedFn((ids: number[]) => ids.slice().reverse())

    expect(fn([1, 23])).toEqual([23, 1])
    expect(fn([12, 3])).toEqual([3, 12])
  })

  it('相同数字数组参数复用缓存实例, 依赖不变不重算', () => {
    const dep = observable.box(1)
    let computes = 0
    const fn = computedFn((ids: number[]) => {
      computes += 1
      return ids.length + dep.get()
    })

    // 模拟 observer 组件建立观察, 使 computed 缓存生效
    let result = 0
    const disposer = autorun(() => {
      result = fn([1, 2, 3])
    })

    expect(result).toBe(4)
    expect(fn([1, 2, 3])).toBe(4)
    expect(computes).toBe(1)

    runInAction(() => dep.set(2))
    expect(fn([1, 2, 3])).toBe(5)
    expect(computes).toBe(2)

    disposer()
  })

  it('原始类型参数复用缓存实例', () => {
    const dep = observable.box(0)
    let computes = 0
    const fn = computedFn((x: number) => {
      computes += 1
      return x + dep.get()
    })

    let result = 0
    const disposer = autorun(() => {
      result = fn(2)
    })

    expect(result).toBe(2)
    expect(fn(2)).toBe(2)
    expect(computes).toBe(1)

    runInAction(() => dep.set(1))
    expect(fn(2)).toBe(3)
    expect(computes).toBe(2)

    expect(fn(3)).toBe(4)
    expect(computes).toBe(3)

    disposer()
  })

  it('默认参数补齐正常', () => {
    const fn = computedFn((x: number, y: number = 10) => x + y)

    expect(fn(1)).toBe(11)
    expect(fn(5, 20)).toBe(25)
  })
})
