/*
 * @Author: czy0729
 * @Date: 2025-01-17 14:49:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:30:25
 */
import { useEffect } from 'react'
import { Keyboard } from 'react-native'
import { IOS } from '@constants/env'

/** 安卓收起键盘需要自行监听 */
function useKeyboardHide(onBlur: () => void) {
  useEffect(() => {
    if (IOS) return

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      onBlur()
    })

    return () => {
      keyboardDidHideListener.remove()
    }
  }, [onBlur])
}

export default useKeyboardHide
