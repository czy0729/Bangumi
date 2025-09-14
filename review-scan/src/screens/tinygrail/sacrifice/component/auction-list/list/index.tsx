/*
 * @Author: czy0729
 * @Date: 2024-03-08 02:49:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:21:40
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { decimal, formatNumber, info } from '@utils'
import { useMount, useObserver } from '@utils/hooks'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function List({ list, amount, avg, median, current }) {
  const { $ } = useStore<Ctx>()
  useMount(() => {
    $.fetchQueueUnique([$.fetchAuctionList, $.fetchTopWeek])
  })

  return useObserver(() => {
    const styles = memoStyles()
    const { auctionsSort } = $.state

    let avgIndex = -1
    let medianIndex = -1
    let currentIndex = -1
    if (auctionsSort === '出价') {
      if (avg) avgIndex = list.findIndex(item => item.price <= avg)
      if (median) medianIndex = list.findIndex(item => item.price <= median)
      if (current) currentIndex = list.findIndex(item => item.price <= current)
    }

    return (
      <>
        {list.map((item, index) => {
          const isSuccess = item.state === 1
          return (
            <Flex key={`${item.time}|${item.price}|${item.amount}`} style={styles.item}>
              <Text style={styles.time} type='tinygrailText' size={12}>
                {item.time}
              </Text>
              <Flex.Item style={_.ml.sm} flex={0.64}>
                <Text type='tinygrailPlain' size={12}>
                  {item.nickname}
                </Text>
              </Flex.Item>
              <Flex.Item style={_.ml.sm}>
                <Touchable
                  onPress={() => {
                    info(`₵${decimal(item.price * item.amount)}`, 1.5)
                  }}
                >
                  <Text type='tinygrailText' size={12}>
                    ₵{formatNumber(item.price)} / {formatNumber(item.amount, 0)}
                  </Text>
                </Touchable>
                {isSuccess && $.state.auctionsSort === '出价' && (
                  <View style={styles.progress}>
                    <View
                      style={[
                        styles.progressBar,
                        {
                          width: `${Math.max(0.03, item.amount / (amount || 10000)) * 100}%`
                        }
                      ]}
                    />
                  </View>
                )}
                <Flex style={styles.badge}>
                  {avgIndex !== -1 && avgIndex === index && (
                    <Text style={_.mr.sm} type='warning' size={9} bold>
                      均价
                    </Text>
                  )}
                  {medianIndex !== -1 && medianIndex === index && (
                    <Text style={_.mr.sm} type='warning' size={9} bold>
                      中位价
                    </Text>
                  )}
                  {currentIndex !== -1 && currentIndex === index && (
                    <Text type='warning' size={9} bold>
                      本周均价
                    </Text>
                  )}
                </Flex>
              </Flex.Item>
              <Text style={_.ml.sm} type={isSuccess ? 'bid' : 'ask'} size={12}>
                {isSuccess ? '成功' : '失败'}
              </Text>
            </Flex>
          )
        })}
      </>
    )
  })
}

export default List
