/*
 * @Author: czy0729
 * @Date: 2021-12-27 06:57:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-19 10:53:33
 */
import { DeviceEventEmitter } from 'react-native'

export function onPressEventEmit(item: {
  text: any
  icon?: string
  onPress?: (...args: any[]) => void
  isTitle?: boolean
  isDestructive?: boolean
  withSeparator?: boolean
  eventType?: any
}) {
  const { eventType, text } = item
  DeviceEventEmitter.emit(eventType, text)
}
