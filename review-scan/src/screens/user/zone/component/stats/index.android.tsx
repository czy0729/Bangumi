/*
 * @Author: czy0729
 * @Date: 2024-01-06 22:54:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:17:49
 */
import React from 'react'
import { Animated } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { Ctx } from '../../types'
import Chart from './chart'
import Counts from './counts'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Stats() {
  const { $, navigation } = useStore<Ctx>()
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
    </Animated.ScrollView>
  )
}

export default ob(Stats, COMPONENT)
