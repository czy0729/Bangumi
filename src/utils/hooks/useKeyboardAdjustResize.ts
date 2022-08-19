/*
 * @Author: czy0729
 * @Date: 2022-03-16 16:19:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 08:44:57
 */
import { InteractionManager } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { androidKeyboardAdjust } from '@utils/ui'
import { IOS } from '@constants/constants'

/** 安卓键盘模式, focus 状态中可调整, blur 后恢复成不可调整 */
function useKeyboardAdjustResize({
  onDidFocus,
  onDidBlur
}: {
  onDidFocus?: any
  onDidBlur?: any
} = {}) {
  useFocusEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (IOS) return

      androidKeyboardAdjust('setAdjustResize')
      if (typeof onDidFocus === 'function') onDidFocus()
    })

    return () => {
      if (IOS) return

      androidKeyboardAdjust('setAdjustPan')
      if (typeof onDidBlur === 'function') onDidBlur()
    }
  })
}

export default useKeyboardAdjustResize
