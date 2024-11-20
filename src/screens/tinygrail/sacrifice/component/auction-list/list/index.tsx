/*
 * @Author: czy0729
 * @Date: 2024-03-08 02:49:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:21:40
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { formatNumber } from '@utils'
import { useMount, useObserver } from '@utils/hooks'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function List() {
  const { $ } = useStore<Ctx>()
  useMount(() => {
    $.fetchQueueUnique([$.fetchAuctionList])
  })

  return useObserver(() => {
    if (!$.state.showLogs) return null

    const { list } = $.auctionList
    if (!list.length) return null

    const styles = memoStyles()
    return (
      <>
        {list
          .slice()
          .reverse()
          .map(item => {
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
                  <Text type='tinygrailText' size={12}>
                    ₵{formatNumber(item.price)} / {formatNumber(item.amount, 0)}
                  </Text>
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
