/*
 * @Author: czy0729
 * @Date: 2019-09-02 16:31:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 11:58:29
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function DepthMap() {
  const { $ } = useStore<Ctx>()
  const { asks = [], bids = [], _loaded } = $.depth
  if (!_loaded) return null
  if (!asks.length && !bids.length) return null

  const styles = memoStyles()
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

  const amount = Math.max(bidsAmount, asksAmount) // 两边最大数量
  const distance = asksLow - bidsHigh
  let marginLeft = (distance / _.window.width) * _.window.width
  if (marginLeft > 80) marginLeft = 80

  let calculateBids = 0
  let calculateAsks = 0
  return (
    <View style={styles.container}>
      <Text style={styles.title} type='tinygrailText' size={12}>
        深度
      </Text>
      <Flex>
        <Flex.Item>
          <Flex>
            {bids
              .slice()
              .reverse()
              .map((item, index) => {
                calculateBids += item.amount
                return (
                  <Flex.Item key={index} style={styles.block}>
                    <View
                      style={[
                        styles.bids,
                        {
                          height:
                            ((bidsAmount - calculateBids) / (bidsAmount || 1)) *
                              styles.block.height +
                            4
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
                        height: (calculateAsks / amount) * styles.block.height + 4,
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

export default ob(DepthMap)

function getKStr(amount) {
  if (amount > 1000) return `${toFixed(amount / 1000, 2)}K`
  return parseInt(amount)
}
