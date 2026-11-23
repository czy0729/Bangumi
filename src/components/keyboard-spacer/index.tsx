/*
 * @Author: czy0729
 * @Date: 2019-06-13 00:04:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-24 10:20:00
 */
import { View } from 'react-native'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { IOS } from '@constants'
import { COMPONENT } from './ds'
import { useKeyboardSpace } from './hooks'
import { styles } from './styles'

import type { Props as KeyboardSpacerProps } from './types'
export type { KeyboardSpacerProps }

/**
 * 弹出的键盘占位
 * @doc https://github.com/Andr3wHur5t/react-native-keyboard-spacer/blob/master/KeyboardSpacer.js
 */
export const KeyboardSpacer = ({
  style,
  topSpacing = 0,
  animate = true,
  onToggle
}: KeyboardSpacerProps) => {
  r(COMPONENT)

  const keyboardSpace = useKeyboardSpace({
    topSpacing,
    animate,
    onToggle
  })

  if (IOS) return null

  return (
    <View
      style={stl(
        styles.container,
        {
          height: keyboardSpace
        },
        style
      )}
      pointerEvents='none'
    />
  )
}

export default KeyboardSpacer
