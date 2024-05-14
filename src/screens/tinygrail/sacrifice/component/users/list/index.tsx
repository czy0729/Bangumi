/*
 * @Author: czy0729
 * @Date: 2024-03-08 17:58:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 18:42:27
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, Text, UserStatus } from '@components'
import { _ } from '@stores'
import { formatNumber, getTimestamp, toFixed } from '@utils'
import { obc } from '@utils/decorators'
import Rank from '@tinygrail/_/rank'
import { Ctx } from '../../../types'
import { EVENT, PARAMS } from '../ds'
import { memoStyles } from './styles'

function List(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  return (
    <Flex style={_.mt.sm} wrap='wrap'>
      {$.users.list
        .filter((item, index) => ($.state.showUsers ? true : index < 3))
        .map((item, index) => (
          <Flex key={index} style={styles.item}>
            <View style={_.mt.xxs}>
              <UserStatus
                style={styles.userStatus}
                last={getTimestamp((item.lastActiveDate || '').replace('T', ' '))}
                mini
              >
                <Avatar
                  navigation={navigation}
                  src={item.avatar}
                  size={32}
                  userId={item.name}
                  name={item.nickName}
                  skeletonType='tinygrail'
                  event={EVENT}
                  params={PARAMS}
                />
              </UserStatus>
            </View>
            <Flex.Item style={_.ml.sm}>
              <Flex style={_.mt.xs}>
                <Rank style={styles.rank} value={item.lastIndex} />
                <Flex.Item>
                  <Text type='tinygrailPlain' size={11} bold numberOfLines={1}>
                    {item.nickName}
                  </Text>
                </Flex.Item>
              </Flex>
              <Text style={_.mt.xs} type='tinygrailText' size={10} bold>
                {item.balance
                  ? `+${formatNumber(item.balance, 0)} (${toFixed(
                      (item.balance / $.chara.total) * 100,
                      2
                    )}%)`
                  : `#${index + 1}`}
              </Text>
            </Flex.Item>
          </Flex>
        ))}
    </Flex>
  )
}

export default obc(List)
