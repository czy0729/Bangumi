/*
 * @Author: czy0729
 * @Date: 2022-03-12 20:43:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-09 15:23:40
 */
import React from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { ScrollView } from '../../scroll-view'
import { Text } from '../../text'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Transition({ fixed, title, headerTitle }: Props) {
  r(COMPONENT)

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
