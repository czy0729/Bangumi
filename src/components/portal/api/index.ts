/*
 * @Author: czy0729
 * @Date: 2026-08-12 08:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 07:28:30
 */
import { DeviceEventEmitter, NativeEventEmitter } from 'react-native'
import { ADD_PORTAL_TYPE, REMOVE_PORTAL_TYPE } from '../ds'
import { allocateKey } from '../utils'

import type { ReactNode } from 'react'
import type { Emitter } from '../types'

// fix react native web does not support DeviceEventEmitter
export const TopViewEventEmitter = (DeviceEventEmitter || new NativeEventEmitter()) as Emitter

/**
 * 静态命令式 API, toast/action-sheet 等通过该实例挂载到全局 Portal
 */
class PortalGuard {
  /** 静态挂载一个门户, priority 决定绘制层级 (默认 0) */
  add = (element: ReactNode, priority?: number): number => {
    const key = allocateKey()
    TopViewEventEmitter.emit(ADD_PORTAL_TYPE, element, key, priority)
    return key
  }

  remove = (key: number): void => {
    TopViewEventEmitter.emit(REMOVE_PORTAL_TYPE, key)
  }
}

export const portal = new PortalGuard()
