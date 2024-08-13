/*
 * @Author: czy0729
 * @Date: 2019-06-23 22:20:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-13 16:13:55
 */
import React from 'react'
import { Animated, View } from 'react-native'
import { userStore } from '@stores'
import { obc } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS, STORYBOOK, USE_NATIVE_DRIVER } from '@constants'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import Lock from '../lock'
import U from '../u'
import Content from './content'
import Service from './service'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function About(props: Props, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <Animated.ScrollView
      ref={ref => {
        const index = TABS.findIndex(item => item.title === '关于')
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
                useNativeDriver: USE_NATIVE_DRIVER,
                listener: props.onScroll
              }
            )
      }
    >
      <View style={styles.page}>
        <Lock />
        <Service />
        <Content />
        {userStore.isDeveloper && !!$.usersInfo.username && <U />}
      </View>
    </Animated.ScrollView>
  )
}

export default obc(About, COMPONENT)
