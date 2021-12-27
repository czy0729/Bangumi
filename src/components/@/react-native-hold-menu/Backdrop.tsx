import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withDelay,
  withTiming
} from 'react-native-reanimated'
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent
} from 'react-native-gesture-handler'

// Components
// import { BlurView } from 'expo-blur'

// Utils
import { styles } from 'react-native-hold-menu/src/components/backdrop/styles'
import {
  CONTEXT_MENU_STATE,
  HOLD_ITEM_TRANSFORM_DURATION,
  WINDOW_HEIGHT
} from 'react-native-hold-menu/src/constants'
import { useInternal } from 'react-native-hold-menu/src/hooks'

const AnimatedBlurView = Animated.createAnimatedComponent(View)
export const BACKDROP_LIGHT_BACKGROUND_COLOR = 'rgba(0,0,0,0.2)'
export const BACKDROP_DARK_BACKGROUND_COLOR = 'rgba(0,0,0,0.5)'

type Context = {
  startPosition: {
    x: number
    y: number
  }
}

const BackdropComponent = () => {
  const { state, theme } = useInternal()

  const tapGestureEvent = useAnimatedGestureHandler<
    TapGestureHandlerGestureEvent,
    Context
  >(
    {
      onStart: (event, context) => {
        context.startPosition = { x: event.x, y: event.y }
      },
      onCancel: () => {
        state.value = CONTEXT_MENU_STATE.END
      },
      onEnd: (event, context) => {
        const distance = Math.hypot(
          event.x - context.startPosition.x,
          event.y - context.startPosition.y
        )
        const shouldClose = distance < 10
        const isStateActive = state.value === CONTEXT_MENU_STATE.ACTIVE

        if (shouldClose && isStateActive) {
          state.value = CONTEXT_MENU_STATE.END
        }
      }
    },
    [state]
  )

  const animatedContainerStyle = useAnimatedStyle(() => {
    const topValueAnimation = () =>
      state.value === CONTEXT_MENU_STATE.ACTIVE
        ? 0
        : withDelay(
            HOLD_ITEM_TRANSFORM_DURATION,
            withTiming(WINDOW_HEIGHT, {
              duration: 0
            })
          )

    const opacityValueAnimation = () =>
      withTiming(state.value === CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
        duration: HOLD_ITEM_TRANSFORM_DURATION
      })

    return {
      top: topValueAnimation(),
      opacity: opacityValueAnimation()
    }
  })

  const animatedInnerContainerStyle = useAnimatedStyle(() => {
    const backgroundColor =
      theme.value === 'light'
        ? BACKDROP_LIGHT_BACKGROUND_COLOR
        : BACKDROP_DARK_BACKGROUND_COLOR

    return { backgroundColor }
  }, [theme])

  return (
    <TapGestureHandler
      onGestureEvent={tapGestureEvent}
      onHandlerStateChange={tapGestureEvent}
    >
      <AnimatedBlurView
        // @ts-ignore
        // intensity={100}
        // tint='default'
        style={[styles.container, animatedContainerStyle]}
      >
        <Animated.View
          style={[{ ...StyleSheet.absoluteFillObject }, animatedInnerContainerStyle]}
        />
      </AnimatedBlurView>
    </TapGestureHandler>
  )
}

const Backdrop = memo(BackdropComponent)

export default Backdrop
