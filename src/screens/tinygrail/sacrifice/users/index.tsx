/*
 * @Author: czy0729
 * @Date: 2019-09-22 02:09:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 18:42:28
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, Iconfont, Text, Touchable, UserStatus } from '@components'
import { _ } from '@stores'
import { formatNumber, getTimestamp, toFixed } from '@utils'
import { obc } from '@utils/decorators'
import Rank from '@tinygrail/_/rank'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const EVENT = {
  id: '资产重组.跳转',
  data: {
    from: '董事会'
  }
} as const

const PARAMS = {
  from: 'tinygrail'
} as const

function Users(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { showUsers } = $.state
  const { total: amount } = $.chara
  const { list, total } = $.users
  return (
    <View style={_.container.inner}>
      <Text type='tinygrailPlain' size={13} lineHeight={17}>
        董事会{' '}
        <Text type='warning' size={17}>
          {total || '-'}
        </Text>
      </Text>
      {showUsers && (
        <Flex style={_.mt.sm} wrap='wrap'>
          {list.map((item, index) => (
            <Flex key={index} style={styles.item}>
              <View style={_.mt.xxs}>
                <UserStatus
                  style={styles.userStatus}
                  last={getTimestamp((item.lastActiveDate || '').replace('T', ' '))}
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
                <Flex style={!!item.balance && _.mt.xs}>
                  <Rank style={styles.rank} value={item.lastIndex} />
                  <Text type='tinygrailPlain' size={11} lineHeight={12} bold numberOfLines={1}>
                    {item.nickName}
                  </Text>
                </Flex>
                {!!item.balance && (
                  <Text type='tinygrailText' size={10} lineHeight={12} bold>
                    +{formatNumber(item.balance, 0)} {toFixed((item.balance / amount) * 100, 2)}%
                  </Text>
                )}
              </Flex.Item>
            </Flex>
          ))}
        </Flex>
      )}
      <Flex style={_.mt.md} justify='center'>
        <Touchable style={styles.expand} onPress={$.toggleUsers}>
          <Iconfont
            name={showUsers ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
            color={_.colorTinygrailText}
          />
        </Touchable>
      </Flex>
    </View>
  )
}

export default obc(Users)
