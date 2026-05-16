/*
 * @Author: czy0729
 * @Date: 2021-11-30 06:27:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-17 05:38:12
 */
import { useEffect, useState } from 'react'
import {
  addOrientationChangeListener,
  getOrientationAsync,
  lockAsync,
  Orientation,
  OrientationLock,
  removeOrientationChangeListener
} from 'expo-screen-orientation'
import { PAD } from '@constants/device'

import type { OrientationChangeEvent } from 'expo-screen-orientation'

/** 默认锁竖屏, 并且监听屏幕方向 */
export default function useOrientation() {
  const [screenOrientation, setScreenOrientation] = useState(Orientation.PORTRAIT_UP)

  useEffect(() => {
    try {
      if (!PAD) lockAsync(OrientationLock.PORTRAIT)
    } catch {}

    const handleOrientationChange = (currentOrientation: OrientationChangeEvent) => {
      const orientationValue = currentOrientation.orientationInfo.orientation
      setScreenOrientation(orientationValue)
    }

    const initScreenOrientation = async () => {
      const currentOrientation = await getOrientationAsync()
      setScreenOrientation(currentOrientation)
    }

    const screenOrientationListener = addOrientationChangeListener(handleOrientationChange)

    initScreenOrientation()
    return () => {
      removeOrientationChangeListener(screenOrientationListener)
    }
  }, [])

  return screenOrientation == 3 || screenOrientation == 4 ? 'LANDSCAPE' : 'PORTRAIT'
}
