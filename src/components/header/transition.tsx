/*
 * @Author: czy0729
 * @Date: 2022-03-12 20:43:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 11:43:43
 */
import React from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { ScrollView } from '../scroll-view'
import { Text } from '../text'
import { Props } from './types'
import { WSA } from '@constants'

type TransitionProps = Pick<Props, 'fixed' | 'title' | 'headerTitle'>

function Transition({ fixed, title, headerTitle }: TransitionProps) {
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
        <Animated.View style={[styles.body, title && styles.bodyTitle, bodyStyles]}>
          {headerTitle || (
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.container}
              horizontal
            >
              <Text style={styles.text} size={15} numberOfLines={1}>
                {title}
              </Text>
            </ScrollView>
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
    left: 48,
    right: 72,
    minHeight: WSA ? 40 : 20 * 1.28
  },
  bodyTitle: {
    bottom: 6
  },
  scrollView: {
    maxWidth: '80%'
  },
  container: {
    paddingRight: _.md,
    paddingLeft: _.sm
  },
  text: {
    marginBottom: _.ios(0, 10),
    marginLeft: -8
  }
}))
