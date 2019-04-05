import React from 'react'
import { Animated } from 'react-native'

export default function createScrollDriver() {
  const scrollOffsetNative = new Animated.Value(0)
  const scrollOffsetNonNative = new Animated.Value(0)

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollOffsetNative } } }],
    { useNativeDriver: true }
  )

  const scrollOffset = {
    scrollOffsetNative,
    scrollOffsetNonNative
  }

  scrollOffsetNative.addListener(
    Animated.event([{ value: scrollOffsetNonNative }], {
      useNativeDriver: false
    })
  )

  const connectProvider = ProviderComponent =>
    React.forwardRef((props, ref) => (
      <ProviderComponent
        onScroll={onScroll}
        scrollEventThrottle={1}
        {...props}
        ref={ref}
      />
    ))

  const connectConsumer = ConsumerComponent =>
    React.forwardRef((props, ref) => (
      <ConsumerComponent {...scrollOffset} {...props} ref={ref} />
    ))

  return {
    connectProvider,
    connectConsumer,
    scrollOffset
  }
}
