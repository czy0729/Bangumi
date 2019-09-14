/*
 * @Author: czy0729
 * @Date: 2019-09-12 15:35:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-14 15:52:51
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorBid, colorAsk, colorIcon, colorBg } from '../../styles'

function Logs({ style }, { $ }) {
  const { bids, asks } = $.userLogs
  return (
    <Flex style={[styles.container, style]} align='start'>
      <Flex.Item>
        <Text style={styles.bid} size={16}>
          买入委托
        </Text>
        {bids.length === 0 && <Text type='sub'>-</Text>}
        {bids
          .sort((a, b) => b.price - a.price)
          .map(item => (
            <View key={item.id} style={styles.item}>
              <Flex>
                <Flex.Item>
                  <Text
                    size={12}
                    style={{
                      color: _.colorPlain
                    }}
                  >
                    {formatNumber(item.price)}
                  </Text>
                </Flex.Item>
                <Text size={12} type='sub'>
                  {formatNumber(item.amount, 0)}
                </Text>
                <Touchable
                  style={[styles.cancel, _.ml.sm]}
                  onPress={() => $.doCancel('bid', item.id)}
                >
                  <Iconfont name='close' size={12} color={colorIcon} />
                </Touchable>
              </Flex>
            </View>
          ))}
      </Flex.Item>
      <Flex.Item style={_.ml.wind}>
        <Text style={styles.ask} size={16}>
          卖出委托
        </Text>
        {asks.length === 0 && <Text type='sub'>-</Text>}
        {asks
          .sort((a, b) => a.price - b.price)
          .map(item => (
            <View key={item.id} style={styles.item}>
              <Flex>
                <Flex.Item>
                  <Text
                    size={12}
                    style={{
                      color: _.colorPlain
                    }}
                  >
                    {formatNumber(item.price)}
                  </Text>
                </Flex.Item>
                <Text size={12} type='sub'>
                  {formatNumber(item.amount, 0)}
                </Text>
                <Touchable
                  style={[styles.cancel, _.ml.sm]}
                  onPress={() => $.doCancel('ask', item.id)}
                >
                  <Iconfont name='close' size={12} color={colorIcon} />
                </Touchable>
              </Flex>
            </View>
          ))}
      </Flex.Item>
    </Flex>
  )
}

Logs.contextTypes = {
  $: PropTypes.object
}

export default observer(Logs)

const styles = StyleSheet.create({
  container: {
    minHeight: 120,
    paddingVertical: _.md,
    paddingHorizontal: _.wind,
    borderTopWidth: _.sm,
    borderTopColor: colorBg
  },
  item: {
    width: '100%'
  },
  bid: {
    marginBottom: _.sm,
    color: colorBid
  },
  ask: {
    marginBottom: _.sm,
    color: colorAsk
  },
  cancel: {
    paddingVertical: _.sm,
    paddingLeft: _.sm
  }
})
