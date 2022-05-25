/*
 * 安卓键盘模式, focus状态中可调整, blur后恢复成不可调整
 *
 * @Author: czy0729
 * @Date: 2022-03-16 16:19:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-25 08:16:29
 */
import { InteractionManager } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { androidKeyboardAdjust } from '@utils/ui'
import { IOS } from '@constants'

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
