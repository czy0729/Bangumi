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

/** 全屏遮罩, 点击关闭, 淡入淡出, 淡出结束后再卸载 */
function BackdropComponent() {
  const show = useContext(MenuShowContext)
  const { theme, close } = useHoldMenu()

  const { showValue, maskStyle } = useMask(show, MENU_ANIMATION_DURATION)

  const tapGesture = Gesture.Tap().onEnd(close)

  if (!showValue) return null

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View
        style={stl(styles.backdrop, maskStyle, {
          backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'
        })}
        accessible={false}
        importantForAccessibility='no'
      />
    </GestureDetector>
  )
}

const Backdrop = memo(BackdropComponent)

export default Backdrop
