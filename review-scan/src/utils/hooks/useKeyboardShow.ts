/*
 * @Author: czy0729
 * @Date: 2025-01-17 14:49:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-17 14:52:44
 */
import { useEffect } from 'react'
import { Keyboard } from 'react-native'
import { IOS } from '@constants/constants'
import { Fn } from '@types'

/** 安卓展开键盘需要自行监听 */
function useKeyboardShow(onFocus: Fn) {
  useEffect(() => {
    if (IOS) return

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      onFocus()
    })

    return () => {
      keyboardDidShowListener.remove()
    }
  }, [onFocus])
}

export default useKeyboardShow
