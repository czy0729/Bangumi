/*
 * @Author: czy0729
 * @Date: 2022-12-26 04:29:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-24 23:16:23
 */
import React, { useCallback, useMemo } from 'react'
import { Animated, View } from 'react-native'
import { Component, Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { ANDROID, SCROLL_VIEW_RESET_PROPS, USE_NATIVE_DRIVER } from '@constants'
import { TABS } from '../../ds'
import Chart from './chart'
import Counts from './counts'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Stats(props: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  /** iOS 才需要 scroll 同步 */
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
        listener: props.onScroll
      }
    )
  }, [$, props.onScroll])

  /** iOS 才需要 ref 转发 */
  const handleRef = useCallback(
    (ref: any) => {
      if (ANDROID) return

      $.forwardRef(
        ref,
        TABS.findIndex(item => item.title === '统计')
      )
    },
    [$]
  )

  const handlePress = useCallback(() => {
    const userId = $.username || $.userId
    navigation.push('UserTimeline', {
      userId,
      userName: $.nickname
    })

    t('空间.跳转', {
      userId,
      to: 'UserTimeline'
    })
  }, [$, navigation])

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Component id='screen-zone-tab-view' data-type='stats'>
        <Animated.ScrollView
          ref={handleRef}
          nestedScrollEnabled={ANDROID}
          contentContainerStyle={ANDROID ? styles.nestScroll : styles.contentContainerStyle}
          {...props}
          {...SCROLL_VIEW_RESET_PROPS}
          onScroll={handleScrollEvent}
        >
          <View style={styles.page}>
            <Counts />
            <Chart />
            <Flex style={_.mt.lg} justify='center'>
              <Touchable style={styles.touch} onPress={handlePress}>
                <Text type='sub' bold>
                  查看TA的时间线热力图
                </Text>
              </Touchable>
            </Flex>
          </View>
        </Animated.ScrollView>
      </Component>
    )
  })
}

export default Stats
