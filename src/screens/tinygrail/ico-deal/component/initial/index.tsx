/*
 * @Author: czy0729
 * @Date: 2019-09-20 21:21:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 18:43:08
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, Text } from '@components'
import { _ } from '@stores'
import { caculateICO, formatNumber, tinygrailOSS } from '@utils'
import { obc } from '@utils/decorators'
import Rank from '@tinygrail/_/rank'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Initial(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { users } = $.chara
  const { list } = $.initial
  const { nextUser } = caculateICO($.chara)
  const EVENT = {
    id: 'ICO交易.跳转'
  } as const
  return (
    <View style={styles.container}>
      <Text type='tinygrailPlain' size={12} lineHeight={16}>
        <Text type='warning' size={16}>
          参与者 {users}
        </Text>{' '}
        / {nextUser}
      </Text>
      <Flex style={_.mt.sm} wrap='wrap'>
        {list.map((item, index) => (
          <Flex key={index} style={styles.item}>
            <Avatar
              navigation={navigation}
              src={tinygrailOSS(item.avatar)}
              size={32}
              userId={item.name}
              name={item.nickName}
              borderColor='transparent'
              skeletonType='tinygrail'
              event={EVENT}
            />
            <Flex.Item style={_.ml.sm}>
              <Flex>
                <Rank style={styles.rank} value={item.lastIndex} />
                <Text type='tinygrailPlain' size={12} bold numberOfLines={1}>
                  {item.nickName}
                </Text>
              </Flex>
              {!!item.amount && (
                <Text type='tinygrailText' size={10} lineHeight={13}>
                  +{formatNumber(item.amount, 0, $.short)}
                </Text>
              )}
            </Flex.Item>
          </Flex>
        ))}
      </Flex>
    </View>
  )
}

export default obc(Initial, COMPONENT)
