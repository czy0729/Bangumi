/* eslint-disable react/no-array-index-key */
/*
 * @Author: czy0729
 * @Date: 2019-09-02 16:31:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-03 04:26:54
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { observer } from '@utils/decorators'

const height = 160

function DepthMap({ style }, { $ }) {
  const { asks = [], bids = [], _loaded } = $.depth
  if (!_loaded) {
    return null
  }
  if (!asks.length && !bids.length) {
    return null
  }

  const styles = memoStyles()
  let bidsLow = 0
  let bidsHigh = 0
  let bidsAmount = 0
  bids.forEach(item => {
    if (!bidsLow || item.price < bidsLow) {
      bidsLow = item.price
    }
    if (!bidsHigh || item.price > bidsHigh) {
      bidsHigh = item.price
    }
    bidsAmount += item.amount
  })

  let asksLow = 0
  let asksHigh = 0
  let asksAmount = 0
  asks.forEach(item => {
    if (!asksLow || item.price < asksHigh) {
      asksLow = item.price
    }
    if (!asksHigh || item.price > asksLow) {
      asksHigh = item.price
    }
    asksAmount += item.amount
  })

  const amount = Math.max(bidsAmount, asksAmount) // 两边最大数量
  const distance = asksLow - bidsHigh
  let marginLeft = (distance / _.window.width) * _.window.width
  if (marginLeft > 80) {
    marginLeft = 80
  }

  let calculateBids = 0
  let calculateAsks = 0
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title} type='tinygrailText' size={12}>
        深度
      </Text>
      <Flex>
        <Flex.Item>
          <Flex>
            {bids.reverse().map((item, index) => {
              calculateBids += item.amount
              return (
                <Flex.Item key={index} style={styles.block}>
                  <View
                    style={[
                      styles.bids,
                      {
                        height:
                          ((bidsAmount - calculateBids) / (bidsAmount || 1)) *
                            height +
                          4,
                        marginLeft: -1.5
                      }
                    ]}
                  />
                </Flex.Item>
              )
            })}
          </Flex>
        </Flex.Item>
        <Flex.Item
          style={{
            marginLeft
          }}
        >
          <Flex justify='end'>
            {asks.map((item, index) => {
              calculateAsks += item.amount
              return (
                <Flex.Item
                  key={index}
                  style={[
                    styles.block,
                    {
                      zIndex: asks.length - index
                    }
                  ]}
                >
                  <View
                    style={[
                      styles.asks,
                      {
                        height: (calculateAsks / amount) * height + 4,
                        marginRight: -(asks.length - index) * 1.5
                      }
                    ]}
                  />
                </Flex.Item>
              )
            })}
          </Flex>
        </Flex.Item>
      </Flex>
      <Flex style={styles.info}>
        <Flex.Item>
          <Flex justify='between'>
            <Text type='tinygrailText' size={12}>
              {bidsLow && toFixed(bidsLow, 2)}
            </Text>
            <Text type='tinygrailText' size={12}>
              {bidsHigh && toFixed(bidsHigh, 2)}
            </Text>
          </Flex>
        </Flex.Item>
        <Flex.Item
          style={{
            marginLeft
          }}
        >
          <Flex justify='between'>
            <Text type='tinygrailText' size={12}>
              {asksLow && toFixed(asksLow, 2)}
            </Text>
            <Text type='tinygrailText' size={12}>
              {asksHigh && toFixed(asksHigh, 2)}
            </Text>
          </Flex>
        </Flex.Item>
      </Flex>
      <Flex style={styles.rod} direction='column' justify='between' align='end'>
        <Text type='tinygrailText' size={12} align='right'>
          {getKStr(amount)}
        </Text>
        <Text type='tinygrailText' size={12} align='right'>
          {getKStr((amount * 4) / 5)}
        </Text>
        <Text type='tinygrailText' size={12} align='right'>
          {getKStr((amount * 3) / 5)}
        </Text>
        <Text type='tinygrailText' size={12} align='right'>
          {getKStr((amount * 2) / 5)}
        </Text>
        <Text type='tinygrailText' size={12} align='right'>
          {getKStr((amount * 1) / 5)}
        </Text>
      </Flex>
    </View>
  )
}

DepthMap.contextTypes = {
  $: PropTypes.object
}

export default observer(DepthMap)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingTop: 48,
    borderTopWidth: 1,
    borderTopColor: _.colorTinygrailBorder
  },
  title: {
    position: 'absolute',
    top: 24,
    left: _.sm
  },
  info: {
    padding: _.sm
  },
  block: {
    height
  },
  bids: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    borderTopColor: _.colorBid,
    borderTopWidth: 1,
    borderRightColor: _.colorBid,
    borderRightWidth: 1,
    backgroundColor: _.colorDepthBid
  },
  asks: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '100%',
    borderTopColor: _.colorAsk,
    borderTopWidth: 1,
    borderLeftColor: _.colorAsk,
    borderLeftWidth: 1,
    backgroundColor: _.colorDepthAsk
  },
  rod: {
    position: 'absolute',
    zIndex: 100,
    top: _.md + _.sm,
    right: _.sm,
    bottom: 56
  }
}))

function getKStr(amount) {
  if (amount > 1000) {
    return `${toFixed(amount / 1000, 2)}K`
  }
  return parseInt(amount)
}
