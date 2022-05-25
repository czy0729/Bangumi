/*
 * @Author: czy0729
 * @Date: 2021-11-30 06:36:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-30 06:44:58
 */
import { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'

const window = Dimensions.get('window')
const screen = Dimensions.get('screen')

export default function useDimensions() {
  const { width, height } = window
  const [dimensions, setDimensions] = useState({
    window,
    screen,
    orientation: width >= height ? 'LANDSCAPE' : 'PORTRAIT'
  })

  const onChange = ({ window, screen }) => {
    const { width, height } = window
    setDimensions({
      window,
      screen,
      orientation: width >= height ? 'LANDSCAPE' : 'PORTRAIT'
    })
  }

  useEffect(() => {
    Dimensions.addEventListener('change', onChange)
    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
  })

  return dimensions
}
