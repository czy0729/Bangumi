/*
 * @Author: czy0729
 * @Date: 2026-11-13 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 12:00:00
 */
import { Animated } from 'react-native'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { Touchable } from '../../touchable'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { MaskProps } from '../types'

/** 遮罩, 点击关闭抽屉 */
function Mask({ progress, color, onToggle }: MaskProps) {
  r(COMPONENT)

  return (
    <Touchable style={styles.wrap} useRN onPress={onToggle}>
      <Animated.View
        style={[
          styles.mask,
          !!color && {
            backgroundColor: color
          },
          {
            opacity: progress
          }
        ]}
      />
    </Touchable>
  )
}

export default observer(Mask)
