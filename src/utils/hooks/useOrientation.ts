/*
 * @Author: czy0729
 * @Date: 2021-11-30 06:27:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-11 10:06:28
 */
import { useEffect, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'
import { PAD } from '@constants/device'

export default function useOrientation() {
  const [screenOrientation, setScreenOrientation] = useState(
    ScreenOrientation.Orientation.PORTRAIT_UP
  )

  useEffect(() => {
    try {
      if (!PAD) ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    } catch (error) {}

    const onOrientationChange = currentOrientation => {
      const orientationValue = currentOrientation.orientationInfo.orientation
      setScreenOrientation(orientationValue)
    }

    const initScreenOrientation = async () => {
      const currentOrientation = await ScreenOrientation.getOrientationAsync()
      setScreenOrientation(currentOrientation)
    }

    const screenOrientationListener =
      ScreenOrientation.addOrientationChangeListener(onOrientationChange)

    initScreenOrientation()
    return () => {
      ScreenOrientation.removeOrientationChangeListener(screenOrientationListener)
    }
  }, [])

  return screenOrientation == 3 || screenOrientation == 4 ? 'LANDSCAPE' : 'PORTRAIT'
}
