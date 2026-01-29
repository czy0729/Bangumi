/*
 * @Author: czy0729
 * @Date: 2024-01-06 22:54:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-29 13:11:50
 */
import React, { useCallback } from 'react'
import { Animated } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import Chart from './chart'
import Counts from './counts'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Stats() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

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
      <Animated.ScrollView
        nestedScrollEnabled
        contentContainerStyle={styles.nestScroll}
        {...SCROLL_VIEW_RESET_PROPS}
      >
        <Counts />
        <Chart />
        <Flex style={_.mt.lg} justify='center'>
          <Touchable style={styles.touch} onPress={handlePress}>
            <Text type='sub' bold>
              查看TA的时间线热力图
            </Text>
          </Touchable>
        </Flex>
      </Animated.ScrollView>
    )
  })
}

export default Stats
