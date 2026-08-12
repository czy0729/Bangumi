/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import type { ReactNode } from 'react'

import type { Manager, QueueAction } from './types'

let keySeed = 10000

/** 全局门户 key 分配器, 静态 add 与 JSX Portal 共用, 保证不冲突 */
export function allocateKey(): number {
  return keySeed++
}

/**
 * 挂载一个门户并返回其 key
 */
export function mountPortal(manager: Manager, children: ReactNode): number {
  const key = allocateKey()
  manager.mount(key, children)
  return key
}

/** 更新已挂载门户内容, key 为空时忽略 */
export function updatePortal(
  manager: Manager,
  key: number | null | undefined,
  children: ReactNode
): void {
  if (key === null || key === undefined) return
  manager.update(key, children)
}

/** 卸载已挂载门户, key 为空时忽略 */
export function unmountPortal(manager: Manager, key: number | null | undefined): void {
  if (key === null || key === undefined) return
  manager.unmount(key)
}

/**
 * 将操作以 FIFO 顺序入队。
 * 仅 update 会尝试替换已存在的 mount 或同 key 的 update, 避免同一个 portal 在挂载前堆积过多操作
 */
export function mergePush(queue: QueueAction[], action: QueueAction): QueueAction[] {
  if (action.type !== 'update') {
    return [...queue, action]
  }
  const index = queue.findIndex(
    op => op.type === 'mount' || (op.type === 'update' && op.key === action.key)
  )
  if (index === -1) {
    return [...queue, action]
  }
  const next = queue.slice()
  next[index] = action
  return next
}

/**
 * 将 host 挂载前累积的操作队列依次应用到 manager
 */
export function applyQueue(queue: QueueAction[], manager: Manager): void {
  queue.forEach(action => {
    if (!action || action.key === undefined) return
    switch (action.type) {
      case 'mount':
        manager.mount(action.key, action.children as ReactNode)
        break
      case 'update':
        manager.update(action.key, action.children as ReactNode)
        break
      case 'unmount':
        manager.unmount(action.key)
        break
    }
  })
}
