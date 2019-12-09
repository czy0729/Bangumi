/*
 * @Author: czy0729
 * @Date: 2019-09-12 19:58:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-09 21:32:07
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'

function Records({ style }, { $ }) {
  const styles = memoStyles()
  const { bidHistory, askHistory } = $.userLogs
  return (
    <Flex style={[styles.container, style]} align='start'>
      <Flex.Item>
        <Text style={styles.bid} size={16}>
          买入记录
        </Text>
        {bidHistory.length === 0 && <Text style={styles.text}>-</Text>}
        {bidHistory.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <View key={index} style={styles.item}>
            <Flex>
              <Flex.Item>
                <Text
                  size={12}
                  style={{
                    color: _.colorTinygrailPlain
                  }}
                >
                  {formatNumber(item.price)} /{' '}
                  <Text style={styles.text} size={12}>
                    {formatNumber(item.amount, 0)}
                  </Text>
                </Text>
              </Flex.Item>
              <Text
                size={12}
                style={{
                  color: _.colorTinygrailPlain
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
        {askHistory.length === 0 && <Text style={styles.text}>-</Text>}
        {askHistory.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <View key={index} style={styles.item}>
            <Flex>
              <Flex.Item>
                <Text
                  size={12}
                  style={{
                    color: _.colorTinygrailPlain
                  }}
                >
                  {formatNumber(item.price)} /{' '}
                  <Text style={styles.text} size={12}>
                    {formatNumber(item.amount, 0)}
                  </Text>
                </Text>
              </Flex.Item>
              <Text
                size={12}
                style={{
                  color: _.colorTinygrailPlain
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

const memoStyles = _.memoStyles(_ => ({
  container: {
    minHeight: 120,
    paddingVertical: _.md,
    paddingHorizontal: _.wind,
    borderTopWidth: _.sm,
    borderTopColor: _.colorTinygrailBg
  },
  item: {
    width: '100%',
    paddingVertical: 6
  },
  bid: {
    marginBottom: _.sm,
    color: _.colorBid
  },
  ask: {
    marginBottom: _.sm,
    color: _.colorAsk
  },
  cancel: {
    paddingVertical: _.sm,
    paddingLeft: _.sm
  },
  text: {
    color: _.colorTinygrailText
  }
}))
