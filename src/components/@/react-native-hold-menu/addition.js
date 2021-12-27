/*
 * @Author: czy0729
 * @Date: 2021-12-27 06:57:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-28 02:59:11
 */
import { DeviceEventEmitter } from 'react-native'

export function onPressEventEmit(item) {
  const { eventType, text } = item
  DeviceEventEmitter.emit(eventType, text)
}
