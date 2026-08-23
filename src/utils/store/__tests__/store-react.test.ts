/*
 * createStoreSubscription 单元测试 (useStoreSelector 可测核心)
 * @Author: czy0729
 * @Date: 2026-08-23 14:00:00
 */
import { observable, runInAction } from 'mobx'
import { createStoreSubscription } from '../react'

import type { IObservableArray } from 'mobx'

// 覆盖 jest.setup.js 的精简 mobx mock
jest.mock('mobx', () => jest.requireActual('mobx'))

describe('createStoreSubscription', () => {
  it('getSnapshot 在订阅前即可初始化快照', () => {
    const store = observable({ count: 1 })
    const sub = createStoreSubscription(store, s => s.count)

    expect(sub.getSnapshot()).toBe(1)
  })

  it('相关属性变化时通知且快照更新', () => {
    const store = observable({ count: 0 })
    const sub = createStoreSubscription(store, s => s.count)
    let notified = 0

    sub.subscribe(() => {
      notified += 1
    })
    // 初始求值不通知
    expect(notified).toBe(0)

    runInAction(() => {
      store.count = 1
    })
    expect(notified).toBe(1)
    expect(sub.getSnapshot()).toBe(1)

    runInAction(() => {
      store.count = 2
    })
    expect(notified).toBe(2)
    expect(sub.getSnapshot()).toBe(2)
  })

  it('未依赖的属性变化不通知', () => {
    const store = observable({ count: 0, other: 'x' })
    const sub = createStoreSubscription(store, s => s.count)
    let notified = 0

    sub.subscribe(() => {
      notified += 1
    })

    runInAction(() => {
      store.other = 'y'
    })
    expect(notified).toBe(0)
    expect(sub.getSnapshot()).toBe(0)
  })

  it('isEqualFn 抑制等值通知', () => {
    const store = observable({
      items: observable.array([{ id: 1 }]) as IObservableArray<{ id: number }>
    })
    // 序列化快照是自定义比较的典型用法
    const sub = createStoreSubscription(
      store,
      s => ({ ids: s.items.map(item => item.id) }),
      (a, b) => JSON.stringify(a) === JSON.stringify(b)
    )
    let notified = 0

    sub.subscribe(() => {
      notified += 1
    })

    // 内容相同的全新结果不通知
    runInAction(() => {
      store.items.replace([{ id: 1 }])
    })
    expect(notified).toBe(0)

    // 内容变化必须通知
    runInAction(() => {
      store.items.replace([{ id: 2 }])
    })
    expect(notified).toBe(1)
    expect(sub.getSnapshot().ids).toEqual([2])
  })

  it('取消订阅后不再通知', () => {
    const store = observable({ count: 0 })
    const sub = createStoreSubscription(store, s => s.count)
    let notified = 0

    const dispose = sub.subscribe(() => {
      notified += 1
    })
    dispose()

    runInAction(() => {
      store.count = 9
    })
    expect(notified).toBe(0)
    // 快照读取仍可用
    expect(sub.getSnapshot()).toBe(0)
  })
})
