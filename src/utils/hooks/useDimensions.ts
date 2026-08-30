/*
 * @Author: czy0729
 * @Date: 2021-11-30 06:36:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 08:28:13
 */
import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'

import type { ScaledSize } from 'react-native'

/** 屏幕尺寸和方向信息 */
type DimensionsInfo = {
  /** 窗口尺寸 (APP 可视区域) */
  window: ScaledSize

  /** 屏幕尺寸 (物理屏幕) */
  screen: ScaledSize

  /** 屏幕方向 */
  orientation: 'LANDSCAPE' | 'PORTRAIT'
}

const window = Dimensions.get('window')
const screen = Dimensions.get('screen')

/**
 * 自定义 Hook，用于获取屏幕尺寸和方向信息。
 */
export default function useDimensions() {
  const { width, height } = window

  const [dimensions, setDimensions] = useState<DimensionsInfo>({
    window,
    screen,
    orientation: width >= height ? 'LANDSCAPE' : 'PORTRAIT'
  })

  const onChange = ({ window, screen }: { window: ScaledSize; screen: ScaledSize }) => {
    const { width, height } = window
    setDimensions({
      window,
      screen,
      orientation: width >= height ? 'LANDSCAPE' : 'PORTRAIT'
    })
  }

  useEffect(() => {
    const dimensionsSubscription = Dimensions.addEventListener('change', onChange)

    return () => {
      dimensionsSubscription.remove()
    }
  }, [])

  return dimensions
}
