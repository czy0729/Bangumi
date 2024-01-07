/*
 * @Author: czy0729
 * @Date: 2019-06-23 22:20:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-07 17:46:47
 */
import React from 'react'
import { Animated, View } from 'react-native'
import { obc } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS, STORYBOOK } from '@constants'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import Content from './content'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function About(props: Props, { $ }: Ctx) {
  const styles = memoStyles()
  const { onScroll } = props
  return (
    <Animated.ScrollView
      ref={ref => {
        const index = TABS.findIndex(item => item.title === '关于TA')
        return $.connectRef(ref, index)
      }}
      contentContainerStyle={styles.contentContainerStyle}
      {...props}
      {...SCROLL_VIEW_RESET_PROPS}
      onScroll={
        STORYBOOK
          ? undefined
          : Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: $.scrollY
                    }
                  }
                }
              ],
              {
                useNativeDriver: true,
                listener: onScroll
              }
            )
      }
    >
      <View style={styles.page}>
        <Content />
      </View>
    </Animated.ScrollView>
  )
}

export default obc(About, COMPONENT)
