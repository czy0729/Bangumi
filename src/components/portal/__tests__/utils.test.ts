/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 07:28:26
 */
// 静态 add 走 DeviceEventEmitter 广播, 这里替换为可断言的 mock
jest.mock('react-native', () => ({
  DeviceEventEmitter: {
    emit: jest.fn(),
    addListener: jest.fn(() => ({ remove: jest.fn() }))
  },
  NativeEventEmitter: class {}
}))

import { DeviceEventEmitter } from 'react-native'
import { ADD_PORTAL_TYPE } from '../ds'
import { portal } from '../api'
import {
  allocateKey,
  applyQueue,
  mergePush,
  mountPortal,
  unmountPortal,
  updatePortal
} from '../utils'

import type { Manager, QueueAction } from '../types'

function createMockManager() {
  const calls: string[] = []
  const mounted: Map<number, unknown> = new Map()
  const priorities: Map<number, number | undefined> = new Map()
  const manager: Manager = {
    mount: (key, children, priority) => {
      calls.push(`mount:${key}`)
      mounted.set(key, children)
      priorities.set(key, priority)
    },
    update: (key, children) => {
      calls.push(`update:${key}`)
      mounted.set(key, children)
    },
    unmount: key => {
      calls.push(`unmount:${key}`)
      mounted.delete(key)
    }
  }
  return { manager, calls, mounted, priorities }
}

describe('allocateKey', () => {
  it('每次调用返回自增的不重复 key', () => {
    const a = allocateKey()
    const b = allocateKey()
    const c = allocateKey()
    expect(a).not.toBe(b)
    expect(b).not.toBe(c)
    expect(c).toBeGreaterThan(a)
  })
})

describe('mountPortal', () => {
  it('以 (number, children) 挂载并返回该 key', () => {
    const { manager, calls, mounted } = createMockManager()
    const key = mountPortal(manager, 'node')
    expect(calls).toEqual([`mount:${key}`])
    expect(typeof key).toBe('number')
    expect(mounted.get(key)).toBe('node')
  })

  it('透传绘制层级 priority', () => {
    const { manager, priorities } = createMockManager()
    const key = mountPortal(manager, 'node', 2)
    expect(priorities.get(key)).toBe(2)
  })
})

describe('updatePortal', () => {
  it('使用 mount 返回的 key 更新内容', () => {
    const { manager, calls, mounted } = createMockManager()
    const key = mountPortal(manager, 'a')
    updatePortal(manager, key, 'b')
    expect(calls[calls.length - 1]).toBe(`update:${key}`)
    expect(mounted.get(key)).toBe('b')
  })

  it('key 为 null/undefined 时忽略', () => {
    const { manager, calls } = createMockManager()
    updatePortal(manager, null, 'node')
    updatePortal(manager, undefined, 'node')
    expect(calls).toEqual([])
  })
})

describe('unmountPortal', () => {
  it('使用 mount 返回的 key 卸载', () => {
    const { manager, calls, mounted } = createMockManager()
    const key = mountPortal(manager, 'node')
    unmountPortal(manager, key)
    expect(calls[calls.length - 1]).toBe(`unmount:${key}`)
    expect(mounted.has(key)).toBe(false)
  })

  it('key 为 null/undefined 时忽略', () => {
    const { manager, calls } = createMockManager()
    unmountPortal(manager, null)
    unmountPortal(manager, undefined)
    expect(calls).toEqual([])
  })
})

describe('mergePush', () => {
  it('空队列时直接追加', () => {
    const next = mergePush([], { type: 'mount', key: 1, children: null })
    expect(next).toHaveLength(1)
    expect(next[0]).toMatchObject({ type: 'mount', key: 1 })
  })

  it('已有 mount 时原地替换为新操作, 保持队列长度', () => {
    const queue: QueueAction[] = [{ type: 'mount', key: 1, children: null }]
    const next = mergePush(queue, { type: 'update', key: 1, children: 'new' })
    expect(next).toHaveLength(1)
    expect(next[0]).toMatchObject({ type: 'update', key: 1 })
  })

  it('同 key 的 update 替换之前的 update, 保持队列长度', () => {
    const queue: QueueAction[] = [{ type: 'update', key: 2, children: 'a' }]
    const next = mergePush(queue, { type: 'update', key: 2, children: 'b' })
    expect(next).toHaveLength(1)
    expect(next[0]).toMatchObject({ children: 'b' })
  })

  it('不同 key 的操作依次追加', () => {
    const queue: QueueAction[] = [{ type: 'mount', key: 1, children: null }]
    const next = mergePush(queue, { type: 'unmount', key: 2 })
    expect(next).toHaveLength(2)
    expect(next[1]).toMatchObject({ type: 'unmount', key: 2 })
  })
})

describe('applyQueue', () => {
  it('按 FIFO 顺序应用到 manager', () => {
    const { manager, calls } = createMockManager()
    applyQueue(
      [
        { type: 'mount', key: 1, children: null },
        { type: 'update', key: 1, children: null },
        { type: 'unmount', key: 1 }
      ],
      manager
    )
    expect(calls).toEqual(['mount:1', 'update:1', 'unmount:1'])
  })

  it('跳过缺少 key 的操作', () => {
    const { manager, calls } = createMockManager()
    applyQueue([{ type: 'mount', children: null } as any, null as any], manager)
    expect(calls).toHaveLength(0)
  })

  it('mount 操作透传绘制层级 priority', () => {
    const { manager, priorities } = createMockManager()
    applyQueue([{ type: 'mount', key: 1, children: 'node', priority: 2 }], manager)
    expect(priorities.get(1)).toBe(2)
  })
})

describe('portal.add', () => {
  it('把绘制层级随事件一起发出', () => {
    const key = portal.add('node', 2)
    expect(DeviceEventEmitter.emit).toHaveBeenCalledWith(ADD_PORTAL_TYPE, 'node', key, 2)
  })
})
