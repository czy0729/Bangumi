/** @format */

import * as React from 'react'
import {
  Animated,
  StyleProp,
  TouchableWithoutFeedback,
  StyleSheet,
  GestureResponderHandlers
} from 'react-native'
import { FunctionComponent } from 'react'
import { stl } from '@utils'

interface BlockProps {
  style?: StyleProp<any>
  dragStartAnimationStyle: StyleProp<any>
  onPress?: () => void
  onLongPress: () => void
  panHandlers: GestureResponderHandlers
  delayLongPress: number
}

export const Block: FunctionComponent<BlockProps> = ({
  style,
  dragStartAnimationStyle,
  // onPress,
  onLongPress,
  children,
  panHandlers,
  delayLongPress
}) => {
  return (
    <Animated.View
      style={stl(styles.blockContainer, style, dragStartAnimationStyle)}
      {...panHandlers}
    >
      <Animated.View>
        <TouchableWithoutFeedback
          // onPress={onPress}
          delayLongPress={delayLongPress}
          delayPressIn={0}
          onPressIn={onLongPress}
        >
          {children}
        </TouchableWithoutFeedback>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  blockContainer: {
    alignItems: 'center'
  }
})
