/*
 * @Author: czy0729
 * @Date: 2025-06-25 22:06:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-25 22:43:26
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { tinygrailStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'
import { Props } from './types'

function Status({ style, id }: Props) {
  return useObserver(() => {
    if (!id) return null

    // 角色当前是否买入、卖出、竞拍中
    const biding = tinygrailStore.bidMap[id] !== undefined
    const asksing = tinygrailStore.asksMap[id] !== undefined
    const auctioning = tinygrailStore.auctionMap[id] !== undefined
    if (!biding && !asksing && !auctioning) return null

    const styles = memoStyles()
    return (
      <Flex style={style}>
        {biding && <View style={[styles.badge, styles.bid]} />}
        {asksing && <View style={[styles.badge, styles.asks]} />}
        {auctioning && <View style={[styles.badge, styles.auction]} />}
      </Flex>
    )
  })
}

export default Status
