/*
 * @Author: czy0729
 * @Date: 2019-06-23 22:20:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:00:22
 */
import React, { useCallback } from 'react'
import { Animated, View } from 'react-native'
import { Component } from '@components'
import { userStore, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { SCROLL_VIEW_RESET_PROPS, USE_NATIVE_DRIVER } from '@constants'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import Lock from '../lock'
import U from '../u'
import Content from './content'
import Service from './service'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function About(props: Props) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  const handleRef = useCallback(
    ref => {
      $.connectRef(
        ref,
        TABS.findIndex(item => item.title === '关于')
      )
    },
    [$]
  )

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-zone-tab-view' data-type='about'>
        <Animated.ScrollView
          ref={handleRef}
          contentContainerStyle={styles.contentContainerStyle}
          {...props}
          {...SCROLL_VIEW_RESET_PROPS}
          onScroll={Animated.event(
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
          )}
        >
          <View style={styles.page}>
            <Lock />
            <Service />
            <Content />
            {userStore.isDeveloper && !!$.usersInfo.username && <U />}
          </View>
        </Animated.ScrollView>
      </Component>
    )
  })
}

export default About
