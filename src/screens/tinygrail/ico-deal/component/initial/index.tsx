/*
 * @Author: czy0729
 * @Date: 2019-09-20 21:21:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 12:09:40
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { caculateICO, formatNumber, tinygrailOSS } from '@utils'
import { ob } from '@utils/decorators'
import Rank from '@tinygrail/_/rank'
import { Ctx } from '../../types'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

function Initial() {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { users } = $.chara
  const { list } = $.initial
  const { nextUser, amount } = caculateICO($.chara)
  return (
    <View style={styles.container}>
      <Text type='tinygrailPlain' size={12} lineHeight={16}>
        <Text type='warning' size={16}>
          参与者 {users}
        </Text>{' '}
        / {nextUser}
      </Text>
      <Flex style={_.mt.sm} wrap='wrap'>
        {list.map((item, index: number) => {
          const showAmount = !!item.amount
          let percent = 0
          if (showAmount) {
            percent = item.amount / ($.chara.total || 10000)
          }

          return (
            <Flex key={item.name} style={styles.item}>
              <Avatar
                navigation={navigation}
                src={tinygrailOSS(item.avatar)}
                size={showAmount ? 46 : 36}
                userId={item.name}
                name={item.nickName}
                borderColor='transparent'
                skeletonType='tinygrail'
                event={EVENT}
              />
              <Flex.Item style={_.ml.sm}>
                <Flex>
                  <Rank value={item.lastIndex} />
                  <Text type='tinygrailPlain' size={12} bold numberOfLines={1}>
                    {item.nickName}
                  </Text>
                </Flex>
                <Text style={_.mt.xs} type='tinygrailText' size={10} bold>
                  {showAmount && (
                    <Text type='warning' size={10} bold>
                      +{formatNumber(item.amount, 0, $.short)}{' '}
                    </Text>
                  )}
                  #{index + 1}
                </Text>
                {showAmount && (
                  <Flex style={_.mt.xxs}>
                    <Flex.Item>
                      <View style={styles.progress}>
                        <View
                          style={[
                            styles.progressBar,
                            {
                              width: `${Math.max(0.04, percent) * 100}%`
                            }
                          ]}
                        />
                      </View>
                    </Flex.Item>
                    <Text type='tinygrailText' size={10} bold>
                      {formatNumber(Math.ceil(amount * percent), 0)} 股
                    </Text>
                  </Flex>
                )}
              </Flex.Item>
            </Flex>
          )
        })}
      </Flex>
      {!!list.length && list.length % 20 === 0 && (
        <Touchable
          style={_.mt.md}
          onPress={() => {
            $.fetchInitial()
          }}
        >
          <Text type='tinygrailText' size={13} bold align='center'>
            [加载更多]
          </Text>
        </Touchable>
      )}
    </View>
  )
}

export default ob(Initial, COMPONENT)
