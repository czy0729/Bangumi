/*
 * @Author: czy0729
 * @Date: 2019-09-12 19:58:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-20 23:56:34
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text } from '@components'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorBid, colorAsk, colorBg, colorText } from '../../styles'

function Records({ style }, { $ }) {
  const { bidHistory, askHistory } = $.userLogs
  return (
    <Flex style={[styles.container, style]} align='start'>
      <Flex.Item>
        <Text style={styles.bid} size={16}>
          买入记录
        </Text>
        {bidHistory.length === 0 && <Text style={styles.colorText}>-</Text>}
        {bidHistory.map(item => (
          <View key={item.id} style={styles.item}>
            <Flex>
              <Flex.Item>
                <Text
                  size={12}
                  style={{
                    color: _.colorPlain
                  }}
                >
                  {formatNumber(item.price)} /{' '}
                  <Text style={styles.colorText} size={12}>
                    {formatNumber(item.amount, 0)}
                  </Text>
                </Text>
              </Flex.Item>
              <Text
                size={12}
                style={{
                  color: _.colorPlain
                }}
              >
                -{formatNumber(item.price * item.amount)}
              </Text>
            </Flex>
          </View>
        ))}
      </Flex.Item>
      <Flex.Item style={_.ml.wind}>
        <Text style={styles.ask} size={16}>
          卖出记录
        </Text>
        {askHistory.length === 0 && <Text style={styles.colorText}>-</Text>}
        {askHistory.map(item => (
          <View key={item.id} style={styles.item}>
            <Flex>
              <Flex.Item>
                <Text
                  size={12}
                  style={{
                    color: _.colorPlain
                  }}
                >
                  {formatNumber(item.price)} /{' '}
                  <Text style={styles.colorText} size={12}>
                    {formatNumber(item.amount, 0)}
                  </Text>
                </Text>
              </Flex.Item>
              <Text
                size={12}
                style={{
                  color: _.colorPlain
                }}
              >
                +{formatNumber(item.price * item.amount)}
              </Text>
            </Flex>
          </View>
        ))}
      </Flex.Item>
    </Flex>
  )
}

Records.contextTypes = {
  $: PropTypes.object
}

export default observer(Records)

const styles = StyleSheet.create({
  container: {
    minHeight: 120,
    paddingVertical: _.md,
    paddingHorizontal: _.wind,
    borderTopWidth: _.sm,
    borderTopColor: colorBg
  },
  item: {
    width: '100%',
    paddingVertical: 6
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
  },
  text: {
    color: colorText
  }
})
