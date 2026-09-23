/*
 * @Author: czy0729
 * @Date: 2026-09-22 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 08:00:00
 * */
import { SensorType, useAnimatedReaction } from 'react-native-reanimated'
import { useAnimatedSensor } from '@utils/hooks'
import { RESTORING_FORCE, ROTATE_FACTOR } from '../ds'

import type { SensorDriverProps } from './types'

/** 传感器采样驱动, 不渲染内容; 卸载即注销陀螺仪订阅 */
export default function SensorDriver({
  sensitivity,
  reverse,
  rotateEnabled,
  translateX,
  translateY,
  rotateX,
  rotateY
}: SensorDriverProps) {
  const sensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 'auto',
    adjustToInterfaceOrientation: true
  })

  useAnimatedReaction(
    () => sensor.sensor.value,
    data => {
      const direction = reverse ? -1 : 1

      translateX.value -= data.y * sensitivity * direction
      translateY.value += data.x * sensitivity * direction

      if (rotateEnabled.value) {
        rotateX.value += data.x * ROTATE_FACTOR
        rotateY.value += data.y * ROTATE_FACTOR
      }

      translateX.value -= translateX.value * RESTORING_FORCE
      translateY.value -= translateY.value * RESTORING_FORCE
      rotateX.value -= rotateX.value * RESTORING_FORCE
      rotateY.value -= rotateY.value * RESTORING_FORCE
    }
  )

  return null
}
