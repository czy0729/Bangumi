/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-12 08:00:00
 */
import type { EmitterSubscription } from 'react-native'
import type { ReactNode } from 'react'

/** 跨端事件发射器最小接口 (DeviceEventEmitter 与 NativeEventEmitter 均实现) */
export type Emitter = {
  emit: (type: string, ...args: unknown[]) => void
  addListener: (type: string, listener: (...args: unknown[]) => void) => EmitterSubscription
}

/** 已挂载的门户条目 */
export type PortalItem = {
  key: number
  children: ReactNode
}

/** Portal host 管理器, 供 PortalConsumer 与静态 add 共用 */
export type Manager = {
  mount: (key: number, children: ReactNode) => void
  update: (key: number, children: ReactNode) => void
  unmount: (key: number) => void
}

/** 挂载队列操作 */
export type QueueAction = {
  type: 'mount' | 'update' | 'unmount'
  key?: number
  children?: ReactNode
}
