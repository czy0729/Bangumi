/*
 * @Author: czy0729
 * @Date: 2023-06-28 10:39:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:18:33
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function Counts() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const userStats = ($.users?.userStats || {}) as any
  return (
    <>
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
    </>
  )
}

export default ob(Counts)
