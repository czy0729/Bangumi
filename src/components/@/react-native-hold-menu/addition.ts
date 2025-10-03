/*
 * @Author: czy0729
 * @Date: 2021-12-27 06:57:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-12 18:59:23
 */
import { DeviceEventEmitter } from 'react-native'

export function onPressEventEmit(item: {
  text: any
  icon?: string
  onPress?: (...args: any[]) => void
  isTitle?: boolean
  isDestructive?: boolean
  withSeparator?: boolean
  pageX?: number
  pageY?: number
  eventType?: any
}) {
  const { eventType, text, pageX, pageY } = item
  DeviceEventEmitter.emit(eventType, {
    value: text,
    pageX,
    pageY
  })
}
