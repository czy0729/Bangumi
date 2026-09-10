/*
 * @Author: czy0729
 * @Date: 2026-08-09 05:48:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 05:21:32
 */
import { memo, useContext } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { stl } from '@utils'
import { MENU_ANIMATION_DURATION } from '../ds'
import { useMask } from '../../mask'
import { MenuShowContext, useHoldMenu } from '../context'
import { styles } from './styles'

/** 全屏遮罩, 点击关闭, 淡入淡出, 常驻挂载 */
function BackdropComponent() {
  const show = useContext(MenuShowContext)
  const { theme, close } = useHoldMenu()

  const { maskStyle } = useMask(show, MENU_ANIMATION_DURATION)

  /** 隐藏时禁用手势, 常驻遮罩不拦截触摸 */
  const tapGesture = Gesture.Tap().enabled(show).onEnd(close)

  /**
   * 常驻挂载: show 首次变为 true 若属于首次挂载, 首帧会直接落到目标透明度,
   * 与挂载合并成最终态, 遮罩出现没有淡入过渡
   */
  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View
        style={stl(
          styles.backdrop,
          maskStyle,
          show ? styles.backdropShown : styles.backdropHidden,
          {
            backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'
          }
        )}
        accessible={false}
        importantForAccessibility='no'
      />
    </GestureDetector>
  )
}

const Backdrop = memo(BackdropComponent)

export default Backdrop
