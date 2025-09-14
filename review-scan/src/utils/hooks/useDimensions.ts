/*
 * @Author: czy0729
 * @Date: 2021-11-30 06:36:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-25 01:26:41
 */
import { useEffect, useState } from 'react'
import { Dimensions, ScaledSize } from 'react-native'

const window = Dimensions.get('window')
const screen = Dimensions.get('screen')

/**
 * 自定义 Hook，用于获取屏幕尺寸和方向信息。
 *
 * @returns {Object} 包含屏幕尺寸（window、screen）以及屏幕方向（orientation）
 */
export default function useDimensions() {
  const { width, height } = window

  // State 类型注解，window、screen 都是 ScaledSize 类型，orientation 是 'LANDSCAPE' | 'PORTRAIT'
  const [dimensions, setDimensions] = useState<{
    window: ScaledSize
    screen: ScaledSize
    orientation: 'LANDSCAPE' | 'PORTRAIT'
  }>({
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
