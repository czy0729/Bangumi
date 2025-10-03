/*
 * @Author: czy0729
 * @Date: 2025-09-12 18:51:22
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-09-12 18:51:22
 */
import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'

type Orientation = 'landscape' | 'portrait'

function getWindowOrientation(): Orientation {
  const { width, height } = Dimensions.get('window')
  return height >= width ? 'portrait' : 'landscape'
}

function useDeviceOrientation() {
  const [deviceOrientation, setDeviceOrientation] = useState<Orientation>(getWindowOrientation())

  useEffect(() => {
    function updateState() {
      setDeviceOrientation(getWindowOrientation())
    }
    const changeEvent = Dimensions.addEventListener('change', updateState)
    return () => changeEvent.remove()
  }, [])

  return deviceOrientation
}

export default useDeviceOrientation
