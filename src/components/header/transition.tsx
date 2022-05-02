/*
 * @Author: czy0729
 * @Date: 2022-03-12 20:43:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-02 12:37:17
 */
import React from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { Text } from '../text'
import { HeaderProps } from './types'

type Props = Pick<HeaderProps, 'fixed' | 'title' | 'headerTitle'>

function Transition({ fixed, title, headerTitle }: Props) {
  const wrapStyles = useAnimatedStyle(() => ({
    opacity: withTiming(fixed ? 1 : 0, {
      duration: 160
    })
  }))
  const bodyStyles = useAnimatedStyle(() => ({
    marginBottom: withTiming(fixed ? 0 : -24, {
      duration: 160
    })
  }))

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Animated.View style={[styles.view, wrapStyles]}>
        <Animated.View style={[styles.body, bodyStyles]}>
          {headerTitle || (
            <Text style={styles.text} size={15}>
              {title}
            </Text>
          )}
        </Animated.View>
      </Animated.View>
    )
  })
}

export default Transition

const memoStyles = _.memoStyles(() => ({
  view: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: _.colorPlain,
    overflow: 'hidden'
  },
  body: {
    position: 'absolute',
    zIndex: 1,
    bottom: 8,
    left: 56,
    right: 72,
    minHeight: 26 * 1.28
  },
  text: {
    marginBottom: 10,
    marginLeft: -8
  }
}))
