/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:10:05
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-09 07:10:05
 */
import React, { memo } from 'react'
import { GestureDetector } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { Portal } from '@components/portal'
import { useHoldMenu } from '../context'
import { useItemAnimation } from './useItemAnimation'
import { useItemGesture } from './useItemGesture'
import { styles } from './styles'

import type { HoldItemProps } from '../types'

function HoldItemComponent({
  items,
  bottom,
  containerStyles,
  menuAnchorPosition,
  activateOn,
  hapticFeedback: hapticStyle,
  actionParams,
  closeOnTap,
  disableMove,
  children
}: HoldItemProps) {
  const { open, close } = useHoldMenu()

  const {
    containerRef,
    onStart,
    isAnimating,
    scaleBack,
    animatedContainerStyle,
    animatedPortalStyle,
    animatedPortalProps
  } = useItemAnimation({
    items,
    open,
    activateOn,
    hapticStyle,
    closeOnTap,
    bottom,
    menuAnchorPosition,
    actionParams,
    disableMove
  })

  const { gesture, overlayGesture } = useItemGesture({
    activateOn,
    onStart,
    scaleBack,
    isAnimating,
    close,
    closeOnTap
  })

  return (
    <>
      <GestureDetector gesture={gesture}>
        <Animated.View ref={containerRef} style={[containerStyles, animatedContainerStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>

      <Portal>
        <Animated.View
          style={[styles.holdItem, animatedPortalStyle]}
          animatedProps={animatedPortalProps}
        >
          <GestureDetector gesture={overlayGesture}>
            <Animated.View style={styles.portalOverlay} />
          </GestureDetector>
          {children}
        </Animated.View>
      </Portal>
    </>
  )
}

const HoldItem = memo(HoldItemComponent)

export default HoldItem
