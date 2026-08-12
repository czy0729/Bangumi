/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
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
  const manager: Manager = {
    mount: (key, children) => {
      calls.push(`mount:${key}`)
      mounted.set(key, children)
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
  return { manager, calls, mounted }
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
})
