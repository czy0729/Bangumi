/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-12 08:10:00
 */
import { useEffect, useRef, useState } from 'react'
import { ADD_PORTAL_TYPE, REMOVE_PORTAL_TYPE } from './ds'
import { TopViewEventEmitter } from './api'
import { applyQueue, mergePush, mountPortal, unmountPortal, updatePortal } from './utils'

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
      mount: (key: number, node: ReactNode) => setItems(prev => [...prev, { key, children: node }]),
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

    const onMount = (node: unknown, key: unknown) => {
      if (mountedRef.current) {
        manager.mount(key as number, node as ReactNode)
      } else {
        queueRef.current = mergePush(queueRef.current, {
          type: 'mount',
          key: key as number,
          children: node as ReactNode
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

/** PortalConsumer 挂载/更新/卸载逻辑, 返回 keyRef 便于卸载时清理 */
export const usePortalConsumer = (manager: Manager | null, children: ReactNode) => {
  const keyRef = useRef<number | null>(null)

  useEffect(() => {
    if (!manager) {
      throw new Error(
        'Looks like you forgot to wrap your root component with `Provider` component.\n\n'
      )
    }
    keyRef.current = mountPortal(manager, children)
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

  return null
}
