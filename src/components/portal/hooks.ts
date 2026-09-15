/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 07:30:11
 */
import { useEffect, useRef, useState } from 'react'
import { TopViewEventEmitter } from './api'
import { applyQueue, mergePush, mountPortal, unmountPortal, updatePortal } from './utils'
import { ADD_PORTAL_TYPE, REMOVE_PORTAL_TYPE } from './ds'

import type { ReactNode } from 'react'
import type { Manager, PortalItem, QueueAction } from './types'

/** Portal host 状态: items + manager + 事件订阅 */
export const usePortalHost = () => {
  const [items, setItems] = useState<PortalItem[]>([])
  const queueRef = useRef<QueueAction[]>([])
  const mountedRef = useRef(false)
  const managerRef = useRef<Manager | null>(null)

  if (!managerRef.current) {
    managerRef.current = {
      mount: (key: number, node: ReactNode, priority = 0) =>
        setItems(prev => [...prev, { key, children: node, priority }]),
      update: (key: number, node: ReactNode) =>
        setItems(prev => prev.map(item => (item.key === key ? { ...item, children: node } : item))),
      unmount: (key: number) => setItems(prev => prev.filter(item => item.key !== key))
    }
  }
  const manager = managerRef.current

  useEffect(() => {
    // host 挂载后, 先处理 mount 前累积的队列
    applyQueue(queueRef.current, manager)
    queueRef.current = []
    mountedRef.current = true

    /** priority 经事件广播传入 (unknown), 归一为可选数字后使用, 非数字视为不传 */
    const onMount = (node: unknown, key: unknown, priority: unknown) => {
      const level = typeof priority === 'number' ? priority : undefined

      if (mountedRef.current) {
        manager.mount(key as number, node as ReactNode, level)
      } else {
        queueRef.current = mergePush(queueRef.current, {
          type: 'mount',
          key: key as number,
          children: node as ReactNode,
          priority: level
        })
      }
    }
    const onUnmount = (key: unknown) => {
      if (mountedRef.current) {
        manager.unmount(key as number)
      } else {
        queueRef.current = mergePush(queueRef.current, { type: 'unmount', key: key as number })
      }
    }

    const onMountSub = TopViewEventEmitter.addListener(ADD_PORTAL_TYPE, onMount)
    const onUnmountSub = TopViewEventEmitter.addListener(REMOVE_PORTAL_TYPE, onUnmount)
    return () => {
      mountedRef.current = false
      try {
        onMountSub.remove()
        onUnmountSub.remove()
      } catch (ex) {}
    }
  }, [manager])

  return { manager, items }
}

/** PortalConsumer 挂载/更新/卸载逻辑, priority 决定绘制层级 (仅挂载时生效) */
export const usePortalConsumer = (
  manager: Manager | null,
  children: ReactNode,
  priority: number = 0
): void => {
  const keyRef = useRef<number | null>(null)

  useEffect(() => {
    if (!manager) {
      throw new Error(
        'Looks like you forgot to wrap your root component with `Provider` component.\n\n'
      )
    }
    keyRef.current = mountPortal(manager, children, priority)
    return () => {
      unmountPortal(manager, keyRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manager])

  useEffect(() => {
    if (!manager) return
    updatePortal(manager, keyRef.current, children)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, manager])
}
