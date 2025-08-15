/*
 * @Author: czy0729
 * @Date: 2019-09-12 15:35:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-28 05:50:34
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { formatNumber } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Logs() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { bids, asks } = $.userLogs
  return (
    <Flex style={styles.container} align='start'>
      <Flex.Item>
        <Flex>
          <Flex.Item>
            <Text type='bid' size={16}>
              买入委托
            </Text>
          </Flex.Item>
          {!!bids.length && (
            <Touchable style={[styles.cancel, _.ml.sm]} onPress={() => $.doCancelAll('bid')}>
              <Iconfont name='md-close' size={14} color={_.colorTinygrailIcon} />
            </Touchable>
          )}
        </Flex>
        {!bids.length && <Text type='tinygrailText'>-</Text>}
        {bids
          .slice()
          .sort((a, b) => b.price - a.price)
          .map((item, index) => (
            <View key={index} style={styles.item}>
              <Flex>
                <Flex.Item>
                  <Text size={12} type='tinygrailPlain'>
                    {formatNumber(item.price)}
                    {item.type === 1 && (
                      <Text size={12} type='tinygrailText'>
                        {' '}
                        [冰山]
                      </Text>
                    )}
                  </Text>
                </Flex.Item>
                <Text type='tinygrailText' size={12}>
                  {formatNumber(item.amount, 0)}
                </Text>
                <Touchable
                  style={[styles.cancel, _.ml.sm]}
                  onPress={() => $.doCancel('bid', item.id)}
                >
                  <Iconfont name='md-close' size={14} color={_.colorTinygrailIcon} />
                </Touchable>
              </Flex>
            </View>
          ))}
      </Flex.Item>
      <Flex.Item style={_.ml.wind}>
        <Flex>
          <Flex.Item>
            <Text type='ask' size={16}>
              卖出委托
            </Text>
          </Flex.Item>
          {!!asks.length && (
            <Touchable style={[styles.cancel, _.ml.sm]} onPress={() => $.doCancelAll('ask')}>
              <Iconfont name='md-close' size={14} color={_.colorTinygrailIcon} />
            </Touchable>
          )}
        </Flex>
        {!asks.length && <Text type='tinygrailText'>-</Text>}
        {asks
          .slice()
          .sort((a, b) => a.price - b.price)
          .map((item, index) => (
            <View key={index} style={styles.item}>
              <Flex>
                <Flex.Item>
                  <Text size={12} type='tinygrailPlain'>
                    {formatNumber(item.price)}
                    {item.type === 1 && (
                      <Text size={12} type='tinygrailText'>
                        {' '}
                        [冰山]
                      </Text>
                    )}
                  </Text>
                </Flex.Item>
                <Text type='tinygrailText' size={12}>
                  {formatNumber(item.amount, 0)}
                </Text>
                <Touchable
                  style={[styles.cancel, _.ml.sm]}
                  onPress={() => $.doCancel('ask', item.id)}
                >
                  <Iconfont name='md-close' size={14} color={_.colorTinygrailIcon} />
                </Touchable>
              </Flex>
            </View>
          ))}
      </Flex.Item>
    </Flex>
  )
}

export default ob(Logs, COMPONENT)
