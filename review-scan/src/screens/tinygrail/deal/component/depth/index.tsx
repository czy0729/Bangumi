/*
 * @Author: czy0729
 * @Date: 2019-09-11 15:01:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 19:44:50
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, TextType, Touchable } from '@components'
import { _, useStore } from '@stores'
import { formatNumber, toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Depth() {
  const { $ } = useStore<Ctx>()
  const { asks = [], bids = [], _loaded } = $.depth
  if (!_loaded) return null

  const styles = memoStyles()
  const { current, fluctuation } = $.chara
  const { bids: userBids, asks: userAsks } = $.userLogs
  let color: TextType = 'tinygrailPlain'
  if (fluctuation > 0) {
    color = 'bid'
  } else if (fluctuation < 0) {
    color = 'ask'
  }

  let bidsLow = 0
  let bidsHigh = 0
  let bidsAmount = 0
  bids.forEach(item => {
    if (!bidsLow || item.price < bidsLow) bidsLow = item.price
    if (!bidsHigh || item.price > bidsHigh) bidsHigh = item.price
    bidsAmount += item.amount
  })

  let asksLow = 0
  let asksHigh = 0
  let asksAmount = 0
  asks.forEach(item => {
    if (!asksLow || item.price < asksHigh) asksLow = item.price
    if (!asksHigh || item.price > asksLow) asksHigh = item.price
    asksAmount += item.amount
  })

  let calculateBids = 0
  let calculateAsks = 0
  let filterCalculateAsks = 0
  return (
    <View style={styles.container}>
      <Flex style={styles.header}>
        <Flex.Item>
          <Text type='tinygrailText' size={11}>
            价格
          </Text>
        </Flex.Item>
        <Text type='tinygrailText' size={11}>
          数量
        </Text>
      </Flex>
      <View style={_.mt.sm}>
        <Flex style={styles.list} direction='column' justify='end'>
          {asks
            // 冰山挂单永远显示, 0优先, 之后小的优先
            .slice()
            .sort((a, b) => (a.price || -10000000) - (b.price || -10000000))
            .filter((item, index) => {
              if (index < 5) return true

              filterCalculateAsks += item.amount
              return false
            })
            .reverse()
            .map((item, index) => {
              const price = toFixed(item.price, 0)
              const isMyOrder = userAsks.findIndex(i => price === toFixed(i.price, 0)) !== -1
              const width =
                ((asksAmount - filterCalculateAsks - calculateAsks) /
                  (asksAmount + filterCalculateAsks)) *
                100
              calculateAsks += item.amount
              return (
                <Touchable
                  key={index}
                  style={styles.block}
                  onPress={() => $.changeValue(toFixed(item.price, 2), item.amount)}
                >
                  <Flex style={styles.item}>
                    {isMyOrder && <View style={styles.dotAsk} />}
                    <Flex.Item>
                      <Text style={_.ml.sm} type='ask' size={12}>
                        {toFixed(item.price, 2)}
                      </Text>
                    </Flex.Item>
                    <Text style={_.mr.wind} type='tinygrailText' size={12}>
                      {formatNumber(item.amount, 0)}
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
        <Flex style={styles.current}>
          <Flex.Item>
            <Touchable
              style={styles.currentPrice}
              onPress={() => $.changeValue(toFixed(current, 2))}
            >
              <Text type={color} size={18} bold>
                {toFixed(current, 2)}{' '}
              </Text>
            </Touchable>
          </Flex.Item>
          {!!$.issuePrice && (
            <Text type='tinygrailText' size={10}>
              发行价 {toFixed($.issuePrice, 0)}
            </Text>
          )}
        </Flex>
        <View style={styles.list}>
          {bids
            // 0优先, 之后大的优先
            .slice()
            .sort((a, b) => (b.price || 10000000) - (a.price || 10000000))
            .filter((_item, index) => index < 5)
            .map((item, index) => {
              const price = toFixed(item.price, 0)
              const isMyOrder = userBids.findIndex(i => price === toFixed(i.price, 0)) !== -1
              calculateBids += item.amount
              return (
                <Touchable
                  key={index}
                  style={styles.block}
                  onPress={() => $.changeValue(toFixed(item.price, 2), item.amount)}
                >
                  <Flex style={styles.item}>
                    {isMyOrder && <View style={styles.dotBid} />}
                    <Flex.Item>
                      <Text style={_.ml.sm} type='bid' size={12}>
                        {toFixed(item.price, 2)}
                      </Text>
                    </Flex.Item>
                    <Text style={_.mr.wind} type='tinygrailText' size={12}>
                      {formatNumber(item.amount, 0)}
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

export default ob(Depth, COMPONENT)
