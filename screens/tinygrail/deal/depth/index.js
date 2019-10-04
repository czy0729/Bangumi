/* eslint-disable react/no-array-index-key */
/*
 * @Author: czy0729
 * @Date: 2019-09-11 15:01:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-20 23:51:23
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'
import {
  colorBid,
  colorAsk,
  colorDepthBid,
  colorDepthAsk,
  colorText
} from '../../styles'

function Depth({ style }, { $ }) {
  const { asks = [], bids = [], _loaded } = $.depth
  if (!_loaded) {
    return null
  }

  const { current, fluctuation } = $.chara
  const { bids: userBids, asks: userAsks } = $.userLogs
  let color = _.colorPlain
  if (fluctuation > 0) {
    color = colorBid
  } else if (fluctuation < 0) {
    color = colorAsk
  }

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

  let calculateBids = 0
  let calculateAsks = 0
  let filterCalculateAsks = 0
  return (
    <View style={[styles.container, style]}>
      <Flex style={styles.header}>
        <Flex.Item>
          <Text style={styles.text} size={10}>
            价格
          </Text>
        </Flex.Item>
        <Text style={styles.text} size={10}>
          数量
        </Text>
      </Flex>
      <View style={_.mt.sm}>
        <Flex style={styles.list} direction='column' justify='end'>
          {asks
            .filter((item, index) => {
              if (index < 5) {
                return true
              }

              filterCalculateAsks += item.amount
              return false
            })
            .reverse()
            .map((item, index) => {
              const isMyOrder =
                userAsks.findIndex(i => i.price === item.price) !== -1
              const width =
                ((asksAmount - filterCalculateAsks - calculateAsks) /
                  (asksAmount + filterCalculateAsks)) *
                100
              calculateAsks += item.amount

              return (
                <Touchable
                  key={index}
                  onPress={() => $.changeValue(item.price)}
                >
                  <Flex style={styles.item}>
                    {isMyOrder && <View style={styles.dotAsk} />}
                    <Flex.Item>
                      <Text style={styles.asks} size={12}>
                        {item.price.toFixed(2)}
                      </Text>
                    </Flex.Item>
                    <Text style={[styles.text, _.mr.wind]} size={12}>
                      {item.amount}
                    </Text>
                    <View
                      style={[
                        styles.depthAsks,
                        {
                          width: `${width}%`
                        }
                      ]}
                    />
                  </Flex>
                </Touchable>
              )
            })}
        </Flex>
        <View style={styles.current}>
          <Touchable onPress={() => $.changeValue(current.toFixed(1))}>
            <Text style={{ color }} size={18} bold>
              {current.toFixed(2)}
            </Text>
          </Touchable>
        </View>
        <View style={styles.list}>
          {bids
            .filter((item, index) => index < 5)
            .map((item, index) => {
              const isMyOrder =
                userBids.findIndex(i => i.price === item.price) !== -1
              calculateBids += item.amount
              return (
                <Touchable
                  key={index}
                  onPress={() => $.changeValue(item.price)}
                >
                  <Flex style={styles.item}>
                    {isMyOrder && <View style={styles.dotBid} />}
                    <Flex.Item>
                      <Text style={styles.bids} size={12}>
                        {item.price.toFixed(2)}
                      </Text>
                    </Flex.Item>
                    <Text style={[styles.text, _.mr.wind]} size={12}>
                      {item.amount}
                    </Text>
                    <View
                      style={[
                        styles.depthBids,
                        {
                          width: `${(calculateBids / bidsAmount) * 100}%`
                        }
                      ]}
                    />
                  </Flex>
                </Touchable>
              )
            })}
        </View>
      </View>
    </View>
  )
}

Depth.contextTypes = {
  $: PropTypes.object
}

export default observer(Depth)

const styles = StyleSheet.create({
  container: {
    paddingVertical: _.sm
  },
  header: {
    paddingLeft: _.sm,
    paddingRight: _.wind,
    opacity: 0.5
  },
  list: {
    minHeight: 128
  },
  current: {
    paddingVertical: _.sm,
    paddingHorizontal: _.sm
  },
  item: {
    width: '100%',
    paddingVertical: 5
  },
  bids: {
    marginLeft: _.sm,
    color: colorBid
  },
  asks: {
    marginLeft: _.sm,
    color: colorAsk
  },
  depthBids: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colorDepthBid
  },
  depthAsks: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colorDepthAsk
  },
  dotBid: {
    width: 5,
    height: 5,
    marginLeft: -5,
    borderRadius: 5,
    backgroundColor: colorBid
  },
  dotAsk: {
    width: 5,
    height: 5,
    marginLeft: -5,
    borderRadius: 5,
    backgroundColor: colorAsk
  },
  text: {
    color: colorText
  }
})
