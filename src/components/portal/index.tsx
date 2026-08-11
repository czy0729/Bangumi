/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { DeviceEventEmitter, NativeEventEmitter, StyleSheet, View } from 'react-native'
import { applyQueue, mergePush, mountPortal, unmountPortal, updatePortal } from './utils'

import type { ReactNode } from 'react'
import type { Manager, PortalItem, QueueAction } from './types'

const addType = 'ANT_DESIGN_MOBILE_RN_ADD_PORTAL'
const removeType = 'ANT_DESIGN_MOBILE_RN_REMOVE_PORTAL'

// fix react native web does not support DeviceEventEmitter
const TopViewEventEmitter: any = DeviceEventEmitter || new NativeEventEmitter()

export const PortalContext = createContext<Manager | null>(null)

/**
 * 静态命令式 API, toast/action-sheet 等通过该实例挂载到全局 Portal
 */
class PortalGuard {
  add = (element: ReactNode) => {
    const key = allocateKey()
    TopViewEventEmitter.emit(addType, element, key)
    return key
  }

  remove = (key: number) => TopViewEventEmitter.emit(removeType, key)
}

export const portal = new PortalGuard()

/**
 * Portal host 实际渲染所有通过 add/Portal 挂载的门户
 */
function PortalHost({ children }: { children?: ReactNode }) {
  const [items, setItems] = useState<PortalItem[]>([])
  const queueRef = useRef<QueueAction[]>([])
  const mountedRef = useRef(false)
  const managerRef = useRef<Manager | null>(null)

  if (!managerRef.current) {
    managerRef.current = {
      mount: (key: number, node: ReactNode) =>
        setItems(prev => [...prev, { key, children: node }]),
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

    const onMount = (node: ReactNode, key: number) => {
      if (mountedRef.current) {
        manager.mount(key, node)
      } else {
        queueRef.current = mergePush(queueRef.current, { type: 'mount', key, children: node })
      }
    }
    const onUnmount = (key: number) => {
      if (mountedRef.current) {
        manager.unmount(key)
      } else {
        queueRef.current = mergePush(queueRef.current, { type: 'unmount', key })
      }
    }

    TopViewEventEmitter.addListener(addType, onMount)
    TopViewEventEmitter.addListener(removeType, onUnmount)
    return () => {
      mountedRef.current = false
      try {
        TopViewEventEmitter.removeListener(addType, onMount)
        TopViewEventEmitter.removeListener(removeType, onUnmount)
      } catch (ex) {}
    }
  }, [manager])

  return (
    <PortalContext.Provider value={manager}>
      <View style={styles.container} collapsable={false}>
        {children}
      </View>
      {items.map((item, index) => (
        <View
          key={item.key}
          collapsable={false}
          /* Need collapsable=false here to clip the elevations, otherwise they appear above sibling components */
          pointerEvents='box-none'
          style={[StyleSheet.absoluteFill, { zIndex: 1000 + index }]}
        >
          {item.children}
        </View>
      ))}
    </PortalContext.Provider>
  )
}

PortalHost.displayName = 'Portal.Host'

function PortalConsumer({ manager, children }: { manager: Manager | null; children?: ReactNode }) {
  const keyRef = useRef<number | null>(null)

  useEffect(() => {
    if (!manager) {
      throw new Error(
        'Looks like you forgot to wrap your root component with `Provider` component.\n\n'
      )
    }
    keyRef.current = mountPortal(manager, children as ReactNode)
    return () => {
      unmountPortal(manager, keyRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manager])

  useEffect(() => {
    if (!manager) return
    updatePortal(manager, keyRef.current, children as ReactNode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, manager])

  return null
}

function Portal({ children }: { children?: ReactNode }) {
  const manager = useContext(PortalContext)
  return <PortalConsumer manager={manager}>{children}</PortalConsumer>
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

Portal.Host = PortalHost
Portal.add = portal.add
Portal.remove = portal.remove

export { Portal }

export default Portal
