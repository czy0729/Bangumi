/*
 * @Author: czy0729
 * @Date: 2022-08-13 09:58:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 00:00:00
 */
import React from 'react'
import { GestureDetector } from 'react-native-gesture-handler'
import { r } from '@utils/dev'
import { useTapGesture } from './hooks'
import { COMPONENT } from './ds'

import type { Props as TapListenerProps } from './types'
export type { TapListenerProps }

/**
 * 获取手指最近一次点击相对于屏幕的坐标
 * @Doc https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/gesture
 */
export const TapListener = ({ children }: TapListenerProps) => {
  r(COMPONENT)

  const tap = useTapGesture()

  return <GestureDetector gesture={tap}>{children}</GestureDetector>
}

export default TapListener
