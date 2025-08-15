/*
 * @Author: czy0729
 * @Date: 2022-12-26 04:29:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-24 23:16:23
 */
import React, { useCallback } from 'react'
import { Animated, View } from 'react-native'
import { Component, Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { SCROLL_VIEW_RESET_PROPS, USE_NATIVE_DRIVER } from '@constants'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import Chart from './chart'
import Counts from './counts'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Stats(props) {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()
  const handleRef = useCallback(
    ref => {
      $.connectRef(
        ref,
        TABS.findIndex(item => item.title === '统计')
      )
    },
    [$]
  )

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-zone-tab-view' data-type='stats'>
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
            <Counts />
            <Chart />
            <Flex style={_.mt.lg} justify='center'>
              <Touchable
                style={styles.touch}
                onPress={() => {
                  const userId = $.username || $.userId
                  t('空间.跳转', {
                    userId,
                    to: 'UserTimeline'
                  })

                  navigation.push('UserTimeline', {
                    userId,
                    userName: $.nickname
                  })
                }}
              >
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
