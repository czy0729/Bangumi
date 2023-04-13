/*
 * @Author: czy0729
 * @Date: 2022-03-12 20:43:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 18:42:14
 */
import React from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useObserver } from '@utils/hooks'
import { scrollTopMap } from '../../storybook/scroll'
import { ScrollView } from '../../scroll-view'
import { Text } from '../../text'
import { memoStyles } from './styles'
import { TransitionProps } from './types'

function Transition({ fixed, title, headerTitle }: TransitionProps) {
  const _fixed = scrollTopMap.get(window.location.search) >= 80 ? true : fixed
  const wrapStyles = useAnimatedStyle(() => ({
    opacity: withTiming(_fixed ? 1 : 0, {
      duration: 160
    })
  }))
  const bodyStyles = useAnimatedStyle(() => ({
    marginBottom: withTiming(_fixed ? 0 : -24, {
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
