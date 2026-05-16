/*
 * @Author: czy0729
 * @Date: 2025-01-17 14:49:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-17 05:38:04
 */
import { useEffect } from 'react'
import { Keyboard } from 'react-native'
import { IOS } from '@constants/constants'

import type { Fn } from '@types'

/** 安卓收起键盘需要自行监听 */
function useKeyboardHide(onBlur: Fn) {
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
