import { useCallback } from 'react'
/*
 * @Author: czy0729
 * @Date: 2022-03-16 16:19:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-16 22:13:44
 */
import { androidKeyboardAdjust } from '@utils/ui'
import { IOS } from '@constants/constants'
import { WEB } from '@constants/device'
import { runAfter } from '../../utils'
import useFocusEffect from './useFocusEffect'

/** 安卓键盘模式, focus 状态中可调整, blur 后恢复成不可调整 */
function useKeyboardAdjustResize({
  onDidFocus,
  onDidBlur
}: {
  onDidFocus?: any
  onDidBlur?: any
} = {}) {
  useFocusEffect(
    useCallback(() => {
      runAfter(() => {
        if (IOS || WEB) return

        androidKeyboardAdjust('setAdjustResize')
        if (typeof onDidFocus === 'function') onDidFocus()
      })

      return () => {
        if (IOS || WEB) return

        androidKeyboardAdjust('setAdjustPan')
        if (typeof onDidBlur === 'function') onDidBlur()
      }
    }, [onDidBlur, onDidFocus])
  )
}

export default useKeyboardAdjustResize
