/*
 * @Author: czy0729
 * @Date: 2023-07-30 18:30:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 01:42:20
 */
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { Touchable } from '../../touchable'
import { useMask } from '../../mask'
import { memoStyles } from './styles'

import type { Props } from './types'

function Mask({ showTextarea, showBgm, onMask }: Props) {
  const show = showTextarea || showBgm
  const { showValue, maskStyle } = useMask(show)

  const styles = memoStyles()

  if (!showValue) return null

  return (
    <View style={styles.container} pointerEvents={show ? 'auto' : 'none'}>
      <Touchable withoutFeedback onPress={onMask}>
        <Animated.View style={[styles.mask, maskStyle]} />
      </Touchable>
    </View>
  )
}

export default observer(Mask)
