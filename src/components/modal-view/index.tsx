/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-12 10:00:00
 */
import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { Portal } from '@components/portal'
import { r } from '@utils/dev'
import { useModalAnimation } from './hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as ModalViewProps } from './types'
export type { ModalViewProps }

/**
 * 模态框动画核心, 支持 slide-up / slide-down / fade 三种进出场动画
 */
export const ModalView = observer(
  ({
    animationType = 'slide-up',
    animateAppear,
    focus = false,
    maskClosable = true,
    maskStyle,
    onAnimationEnd,
    onClose,
    style,
    visible = false,
    wrapStyle,
    children
  }: ModalViewProps) => {
    r(COMPONENT)

    const { rendered, maskAnimatedStyle, contentAnimatedStyle, focusAnimatedStyle } =
      useModalAnimation({
        animationType,
        animateAppear,
        focus,
        onAnimationEnd,
        visible
      })

    if (!rendered) {
      return null
    }

    return (
      <Portal>
        <View style={[styles.wrap, wrapStyle]}>
          <TouchableWithoutFeedback onPress={maskClosable ? onClose : undefined}>
            <Animated.View style={[styles.absolute, maskAnimatedStyle]}>
              <View style={[styles.absolute, styles.mask, maskStyle]} />
            </Animated.View>
          </TouchableWithoutFeedback>
          <Animated.View style={[contentAnimatedStyle, focusAnimatedStyle, style]}>
            {children}
          </Animated.View>
        </View>
      </Portal>
    )
  }
)

export default ModalView
