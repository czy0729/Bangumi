/*
 * @Author: czy0729
 * @Date: 2026-08-09 05:48:45
 * @Last Modified by: czy0729
 * @Last Modified time:  2026-11-01 04:38:24
 */
import { memo, useContext } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { stl } from '@utils'
import { MASK_COLOR_LIGHT } from '@constants'
import { MENU_ANIMATION_DURATION } from '../ds'
import { useMask } from '../../mask'
import { MenuShowContext, useHoldMenu } from '../context'
import { styles } from './styles'

/** 全屏遮罩, 点击关闭, 淡入淡出, 随菜单层挂载/卸载 */
function BackdropComponent() {
  const show = useContext(MenuShowContext)
  const { theme, close } = useHoldMenu()

  const { maskStyle, disabled, staticMaskStyle } = useMask(show, MENU_ANIMATION_DURATION)

  /**
   * 常驻遮罩不拦截触摸由样式 pointerEvents 控制, 手势本身不再按 show 开关
   * 避免 show 与视觉状态不一致时遮罩点不掉 (只能杀进程恢复)
   */
  const tapGesture = Gesture.Tap().onEnd(close)

  /**
   * 遮罩在 open() 提交内容时挂载 (此时 show 仍为 false, opacity 从 0 起步),
   * 到 activate() 置 show=true 时已有挂载帧, 淡入因此正常发生, 不会直接落到终态
   */
  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View
        style={stl(
          styles.backdrop,
          disabled ? staticMaskStyle : maskStyle,
          show ? styles.backdropShown : styles.backdropHidden,
          {
            backgroundColor: theme === 'dark' ? MASK_COLOR_LIGHT : 'rgba(0, 0, 0, 0.1)'
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
