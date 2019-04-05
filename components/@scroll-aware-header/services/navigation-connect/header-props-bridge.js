import React from 'react'
import { Animated } from 'react-native'

function connectToHeaderProps(HeaderComponent) {
  return props => {
    const {
      headerProps: {
        scene: {
          index,
          descriptor: { options, navigation }
        },
        position
      }
    } = props

    const scrollOffsetNative = navigation.getParam(
      'scrollOffsetNative',
      new Animated.Value(0)
    )
    const scrollOffsetNonNative = navigation.getParam(
      'scrollOffsetNonNative',
      new Animated.Value(0)
    )

    const transition = Animated.subtract(position, new Animated.Value(index))

    return (
      <HeaderComponent
        {...options}
        navigation={navigation}
        scrollOffsetNative={scrollOffsetNative}
        scrollOffsetNonNative={scrollOffsetNonNative}
        transition={transition}
        screenIndex={index}
        {...props}
      />
    )
  }
}

export function headerPropsBridge(HeaderComponent) {
  return headerProps => {
    const ConnectedHeaderComponent = connectToHeaderProps(HeaderComponent)
    return <ConnectedHeaderComponent headerProps={headerProps} />
  }
}
