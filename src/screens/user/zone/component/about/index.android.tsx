/*
 * @Author: czy0729
 * @Date: 2024-01-07 17:32:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-27 06:17:26
 */
import React from 'react'
import { Animated } from 'react-native'
import { ob } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import Content from './content'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function About() {
  const styles = memoStyles()
  return (
    <Animated.ScrollView
      nestedScrollEnabled
      contentContainerStyle={styles.nestScroll}
      {...SCROLL_VIEW_RESET_PROPS}
    >
      <Content />
    </Animated.ScrollView>
  )
}

export default ob(About, COMPONENT)
