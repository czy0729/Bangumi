/*
 * @Author: czy0729
 * @Date: 2019-09-02 20:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 11:55:46
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { stl, toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function DepthList({ style }) {
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

  let calculateBids = 0
  let calculateAsks = 0
  return (
    <View style={stl(styles.container, style)}>
      <Flex style={styles.header}>
        <Text style={[styles.index, _.ml.md]} type='tinygrailText' size={10}>
          买盘
        </Text>
        <Text style={styles.amount} type='tinygrailText' size={10}>
          数量
        </Text>
        <Flex.Item>
          <Text type='tinygrailText' size={10} align='center'>
            价格
          </Text>
        </Flex.Item>
        <Text style={styles.amount} type='tinygrailText' size={10} align='right'>
          数量
        </Text>
        <Text style={[styles.index, _.mr.md]} type='tinygrailText' size={10} align='right'>
          卖盘
        </Text>
      </Flex>
      <Flex style={_.mt.sm} align='start'>
        <Flex.Item>
          {bids.map((item, index) => {
            calculateBids += item.amount
            return (
              <Flex key={index} style={styles.item}>
                <View style={[styles.index, _.ml.md]}>
                  <Text type='tinygrailText' size={12}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={styles.amount} type='tinygrailText' size={12}>
                  {item.amount}
                </Text>
                <Flex.Item style={_.mr.sm}>
                  <Text type='bid' size={12} align='right'>
                    {item.price && toFixed(item.price, 2)}
                  </Text>
                </Flex.Item>
                <View
                  style={[
                    styles.depthBids,
                    {
                      width: `${(calculateBids / bidsAmount) * 100}%`
                    }
                  ]}
                />
              </Flex>
            )
          })}
        </Flex.Item>
        <Flex.Item>
          {asks.map((item, index) => {
            calculateAsks += item.amount
            return (
              <Flex key={index} style={styles.item}>
                <Flex.Item style={_.ml.sm}>
                  <Text type='ask' size={12}>
                    {item.price && toFixed(item.price, 2)}
                  </Text>
                </Flex.Item>
                <Text style={styles.amount} type='tinygrailText' size={12} align='right'>
                  {item.amount}
                </Text>
                <View style={[styles.index, _.mr.md]}>
                  <Text type='tinygrailText' size={12} align='right'>
                    {index + 1}
                  </Text>
                </View>
                <View
                  style={[
                    styles.depthAsks,
                    {
                      width: `${(calculateAsks / asksAmount) * 100}%`
                    }
                  ]}
                />
              </Flex>
            )
          })}
        </Flex.Item>
      </Flex>
    </View>
  )
}

export default ob(DepthList)
