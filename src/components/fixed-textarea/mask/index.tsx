/*
 * @Author: czy0729
 * @Date: 2023-07-30 18:30:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 01:42:20
 */
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { useMask } from '../../mask'
import { Touchable } from '../../touchable'
import { memoStyles } from './styles'

import type { Props } from './types'

function Mask({ showTextarea, showBgm, onMask }: Props) {
  const show = showTextarea || showBgm
  const { maskStyle } = useMask(show)

  const styles = memoStyles()

  /**
   * 常驻挂载, 只用透明度控制显隐
   * 不能在 show 为 false 时卸载: show 变 true 时属于首次挂载, 首帧会直接落到目标透明度,
   * 与挂载合并成最终态, 遮罩出现没有淡入过渡
   */
  return (
    <View style={styles.container} pointerEvents={show ? 'auto' : 'none'}>
      <Touchable withoutFeedback onPress={onMask}>
        <Animated.View style={[styles.mask, maskStyle]} />
      </Touchable>
    </View>
  )
}

export default observer(Mask)
