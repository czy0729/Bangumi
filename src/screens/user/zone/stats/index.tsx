/*
 * @Author: czy0729
 * @Date: 2022-12-26 04:29:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-23 12:17:45
 */
import React from 'react'
import { View, Animated } from 'react-native'
import { Flex, Text } from '@components'
import { obc } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { TABS } from '../ds'
import { Ctx } from '../types'
import Chart from './chart'
import { memoStyles } from './styles'

function Stats(props, { $ }: Ctx) {
  const styles = memoStyles()
  const userStats = ($.users?.userStats || {}) as any
  const { onScroll } = props
  return (
    <Animated.ScrollView
      ref={ref => {
        const index = TABS.findIndex(item => item.title === '统计')
        return $.connectRef(ref, index)
      }}
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
          useNativeDriver: true,
          listener: onScroll
        }
      )}
    >
      <View style={styles.page}>
        <Flex>
          <Flex.Item>
            <View style={[styles.block, styles.blockMain]}>
              <Text type='__plain__' size={20} bold>
                {userStats?.total}
              </Text>
              <Text type='__plain__' size={12} bold>
                收藏
              </Text>
            </View>
          </Flex.Item>
          <Flex.Item>
            <View style={[styles.block, styles.blockSuccess]}>
              <Text type='__plain__' size={20} bold>
                {userStats?.collect}
              </Text>
              <Text type='__plain__' size={12} bold>
                完成
              </Text>
            </View>
          </Flex.Item>
          <Flex.Item>
            <View style={[styles.block, styles.blockPrimary]}>
              <Text type='__plain__' size={20} bold>
                {userStats?.percent}
              </Text>
              <Text type='__plain__' size={12} bold>
                完成率
              </Text>
            </View>
          </Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item>
            <View style={[styles.block, styles.blockWarning]}>
              <Text type='__plain__' size={20} bold>
                {userStats?.avg}
              </Text>
              <Text type='__plain__' size={12} bold>
                平均分
              </Text>
            </View>
          </Flex.Item>
          <Flex.Item>
            <View style={[styles.block, styles.blockPurple]}>
              <Text type='__plain__' size={20} bold>
                {userStats?.std}
              </Text>
              <Text type='__plain__' size={12} bold>
                标准差
              </Text>
            </View>
          </Flex.Item>
          <Flex.Item>
            <View style={[styles.block, styles.blockSky]}>
              <Text type='__plain__' size={20} bold>
                {userStats?.scored}
              </Text>
              <Text type='__plain__' size={12} bold>
                评分数
              </Text>
            </View>
          </Flex.Item>
        </Flex>
        <Chart count={userStats?.chart} />
      </View>
    </Animated.ScrollView>
  )
}

export default obc(Stats)
