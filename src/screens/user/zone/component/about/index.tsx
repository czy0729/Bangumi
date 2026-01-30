/*
 * @Author: czy0729
 * @Date: 2019-06-23 22:20:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-29
 */
import React, { useCallback, useMemo } from 'react'
import { Animated, View } from 'react-native'
import { Component } from '@components'
import { userStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { ANDROID, SCROLL_VIEW_RESET_PROPS, USE_NATIVE_DRIVER } from '@constants'
import { TABS } from '../../ds'
import Lock from '../lock'
import U from '../u'
import Content from './content'
import Service from './service'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'
import type { Ctx } from '../../types'

function About({ onScroll }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  /** iOS 才需要 scroll 事件 */
  const handleScrollEvent = useMemo(() => {
    if (ANDROID) return undefined

    return Animated.event(
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
        listener: onScroll
      }
    )
  }, [$, onScroll])

  /** iOS 才需要 ref 转发 */
  const handleRef = useCallback(
    (ref: any) => {
      if (ANDROID) return

      $.forwardRef(
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
          nestedScrollEnabled={ANDROID}
          contentContainerStyle={ANDROID ? styles.nestScroll : styles.contentContainerStyle}
          {...SCROLL_VIEW_RESET_PROPS}
          onScroll={handleScrollEvent}
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
