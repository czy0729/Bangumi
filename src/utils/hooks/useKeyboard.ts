/*
 * @Author: czy0729
 * @Date: 2023-03-11 13:23:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-11 13:25:48
 */
import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

/**
 * 自定义 Hook，用于获取键盘高度，键盘收起时返回 `0`
 */
function useKeyboard(): number {
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height)
    })

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0)
    })

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return keyboardHeight
}

export default useKeyboard
