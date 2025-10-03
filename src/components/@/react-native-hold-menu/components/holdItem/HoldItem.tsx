/*
 * @Author: czy0729
 * @Date: 2025-09-12 18:50:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-03 21:45:39
 */
import React, { memo, useMemo } from 'react'
import { ViewProps } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  AnimationCallback,
  measure,
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import { nanoid } from 'nanoid/non-secure'
import { Portal } from '@gorhom/portal'
import styleGuide from '../../styleGuide'
import {
  CONTEXT_MENU_STATE,
  HOLD_ITEM_SCALE_DOWN_DURATION,
  HOLD_ITEM_SCALE_DOWN_VALUE,
  HOLD_ITEM_TRANSFORM_DURATION,
  SPRING_CONFIGURATION,
  WINDOW_HEIGHT,
  WINDOW_WIDTH
} from '../../constants'
import { useDeviceOrientation, useInternal } from '../../hooks'
import {
  calculateMenuHeight,
  getTransformOrigin,
  TransformOriginAnchorPosition
} from '../../utils/calculations'
import styles from './styles'

import type { HoldItemProps } from './types'

type Context = { didMeasureLayout: boolean }

const HoldItemComponent = ({
  items,
  bottom,
  containerStyles,
  disableMove,
  menuAnchorPosition,
  activateOn,
  hapticFeedback,
  actionParams,
  closeOnTap,
  children
}: HoldItemProps) => {
  //#region hooks
  const { state, menuProps, paddingBottom } = useInternal()
  const deviceOrientation = useDeviceOrientation()
  //#endregion

  //#region variables
  const isActive = useSharedValue(false)
  const isAnimationStarted = useSharedValue(false)

  const itemRectY = useSharedValue<number>(0)
  const itemRectX = useSharedValue<number>(0)
  const itemRectWidth = useSharedValue<number>(0)
  const itemRectHeight = useSharedValue<number>(0)
  const itemScale = useSharedValue<number>(1)
  const transformValue = useSharedValue<number>(0)

  const transformOrigin = useSharedValue<TransformOriginAnchorPosition>(
    menuAnchorPosition || 'top-right'
  )

  const key = useMemo(() => `hold-item-${nanoid()}`, [])
  const menuHeight = useMemo(() => {
    const itemsWithSeparator = items.filter(item => item.withSeparator)
    return calculateMenuHeight(items.length, itemsWithSeparator.length)
  }, [items])

  const isHold = !activateOn || activateOn === 'hold'
  //#endregion

  //#region refs
  const containerRef = useAnimatedRef<Animated.View>()
  //#endregion

  //#region functions
  const hapticResponse = () => {
    const style = !hapticFeedback ? 'Medium' : hapticFeedback
    switch (style) {
      case `Selection`:
        Haptics.selectionAsync()
        break
      case `Light`:
      case `Medium`:
      case `Heavy`:
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle[style])
        break
      case `Success`:
      case `Warning`:
      case `Error`:
        Haptics.notificationAsync(Haptics.NotificationFeedbackType[style])
        break
      default:
    }
  }
  //#endregion

  //#region worklet functions
  const activateAnimation = (ctx: Context) => {
    'worklet'
    if (!ctx.didMeasureLayout) {
      const measured = measure(containerRef)

      itemRectY.value = measured.pageY
      itemRectX.value = measured.pageX
      itemRectHeight.value = measured.height
      itemRectWidth.value = measured.width

      if (!menuAnchorPosition) {
        const position = getTransformOrigin(
          measured.pageX,
          itemRectWidth.value,
          deviceOrientation === 'portrait' ? WINDOW_WIDTH : WINDOW_HEIGHT,
          bottom
        )
        transformOrigin.value = position
      }
    }
  }

  const calculateTransformValue = () => {
    'worklet'
    const height = deviceOrientation === 'portrait' ? WINDOW_HEIGHT : WINDOW_WIDTH
    const isAnchorPointTop = transformOrigin.value.includes('top')

    let tY = 0
    if (!disableMove) {
      if (isAnchorPointTop) {
        const topTransform =
          itemRectY.value + itemRectHeight.value + menuHeight + styleGuide.spacing + paddingBottom

        tY = topTransform > height ? height - topTransform : 0
      } else {
        const bototmTransform = itemRectY.value - menuHeight
        tY = bototmTransform < 0 ? -bototmTransform + styleGuide.spacing * 2 : 0
      }
    }
    return tY
  }

  const setMenuProps = () => {
    'worklet'
    menuProps.value = {
      itemHeight: itemRectHeight.value,
      itemWidth: itemRectWidth.value,
      itemY: itemRectY.value,
      itemX: itemRectX.value,
      anchorPosition: transformOrigin.value,
      menuHeight: menuHeight,
      items,
      transformValue: transformValue.value,
      actionParams: actionParams || {}
    }
  }

  const scaleBack = () => {
    'worklet'
    itemScale.value = withTiming(1, {
      duration: HOLD_ITEM_TRANSFORM_DURATION / 2
    })
  }

  const onCompletion: AnimationCallback = (isFinised?: boolean) => {
    'worklet'
    const isListValid = items && items.length > 0
    if (isFinised && isListValid) {
      state.value = CONTEXT_MENU_STATE.ACTIVE
      isActive.value = true
      scaleBack()
      if (hapticFeedback !== 'None') {
        runOnJS(hapticResponse)()
      }
    }

    isAnimationStarted.value = false
  }

  const scaleHold = () => {
    'worklet'
    itemScale.value = withTiming(
      HOLD_ITEM_SCALE_DOWN_VALUE,
      { duration: HOLD_ITEM_SCALE_DOWN_DURATION },
      onCompletion
    )
  }

  const scaleTap = () => {
    'worklet'
    isAnimationStarted.value = true

    itemScale.value = withSequence(
      withTiming(HOLD_ITEM_SCALE_DOWN_VALUE, {
        duration: HOLD_ITEM_SCALE_DOWN_DURATION
      }),
      withTiming(
        1,
        {
          duration: HOLD_ITEM_TRANSFORM_DURATION / 2
        },
        onCompletion
      )
    )
  }

  const canCallActivateFunctions = () => {
    'worklet'
    const willActivateWithTap = activateOn === 'double-tap' || activateOn === 'tap'
    return (willActivateWithTap && !isAnimationStarted.value) || !willActivateWithTap
  }
  //#endregion

  //#region gesture definitions
  const gesture = useMemo(() => {
    const ctx: Context = { didMeasureLayout: false }

    if (activateOn === 'double-tap') {
      return Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
          if (canCallActivateFunctions()) {
            activateAnimation(ctx)
            transformValue.value = calculateTransformValue()
            setMenuProps()
            if (!isActive.value) scaleTap()
          }
        })
        .onFinalize(() => {
          ctx.didMeasureLayout = false
        })
    }

    if (activateOn === 'tap') {
      return Gesture.Tap()
        .numberOfTaps(1)
        .onStart(() => {
          if (canCallActivateFunctions()) {
            activateAnimation(ctx)
            transformValue.value = calculateTransformValue()
            setMenuProps()
            if (!isActive.value) scaleTap()
          }
        })
        .onFinalize(() => {
          ctx.didMeasureLayout = false
        })
    }

    // default hold
    return Gesture.LongPress()
      .minDuration(150)
      .onStart(() => {
        if (canCallActivateFunctions()) {
          activateAnimation(ctx)
          transformValue.value = calculateTransformValue()
          setMenuProps()
          if (!isActive.value) scaleHold()
        }
      })
      .onFinalize(() => {
        ctx.didMeasureLayout = false
        if (isHold) scaleBack()
      })
  }, [activateOn])

  const overlayGesture = useMemo(() => {
    return Gesture.Tap()
      .numberOfTaps(1)
      .onEnd(() => {
        if (closeOnTap) state.value = CONTEXT_MENU_STATE.END
      })
  }, [closeOnTap])
  //#endregion

  //#region animated styles & props
  const animatedContainerStyle = useAnimatedStyle(() => {
    const animateOpacity = () =>
      withDelay(HOLD_ITEM_TRANSFORM_DURATION, withTiming(1, { duration: 0 }))

    return {
      opacity: isActive.value ? 0 : animateOpacity(),
      transform: [
        {
          scale: isActive.value
            ? withTiming(1, { duration: HOLD_ITEM_TRANSFORM_DURATION })
            : itemScale.value
        }
      ]
    }
  })
  const containerStyle = React.useMemo(
    () => [containerStyles, animatedContainerStyle],
    [containerStyles, animatedContainerStyle]
  )

  const animatedPortalStyle = useAnimatedStyle(() => {
    const animateOpacity = () =>
      withDelay(HOLD_ITEM_TRANSFORM_DURATION, withTiming(0, { duration: 0 }))

    const tY = calculateTransformValue()
    const transformAnimation = () =>
      disableMove
        ? 0
        : isActive.value
        ? withSpring(tY, SPRING_CONFIGURATION)
        : withTiming(-0.1, { duration: HOLD_ITEM_TRANSFORM_DURATION })

    return {
      zIndex: 10,
      position: 'absolute',
      top: itemRectY.value,
      left: itemRectX.value,
      width: itemRectWidth.value,
      height: itemRectHeight.value,
      opacity: isActive.value ? 1 : animateOpacity(),
      transform: [
        { translateY: transformAnimation() },
        {
          scale: isActive.value
            ? withTiming(1, { duration: HOLD_ITEM_TRANSFORM_DURATION })
            : itemScale.value
        }
      ]
    }
  })
  const portalContainerStyle = useMemo(
    () => [styles.holdItem, animatedPortalStyle],
    [animatedPortalStyle]
  )

  const animatedPortalProps = useAnimatedProps<ViewProps>(() => ({
    pointerEvents: isActive.value ? 'auto' : 'none'
  }))
  //#endregion

  //#region animated effects
  useAnimatedReaction(
    () => state.value,
    _state => {
      if (_state === CONTEXT_MENU_STATE.END) {
        isActive.value = false
      }
    }
  )
  //#endregion

  //#region render
  return (
    <>
      <GestureDetector gesture={gesture}>
        <Animated.View ref={containerRef} style={containerStyle}>
          {children}
        </Animated.View>
      </GestureDetector>

      <Portal key={key} name={key}>
        <Animated.View key={key} style={portalContainerStyle} animatedProps={animatedPortalProps}>
          <GestureDetector gesture={overlayGesture}>
            <Animated.View style={styles.portalOverlay} />
          </GestureDetector>
          {children}
        </Animated.View>
      </Portal>
    </>
  )
  //#endregion
}

const HoldItem = memo(HoldItemComponent)
export default HoldItem
