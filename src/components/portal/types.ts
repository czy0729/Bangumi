/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import type { ReactNode } from 'react'

export type PortalItem = {
  key: number
  children: ReactNode
}

export type Manager = {
  mount: (key: number, children: ReactNode) => void
  update: (key: number, children: ReactNode) => void
  unmount: (key: number) => void
}

export type QueueAction = {
  type: 'mount' | 'update' | 'unmount'
  key?: number
  children?: ReactNode
}