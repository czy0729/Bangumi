/*
 * @Author: czy0729
 * @Date: 2021-03-04 00:53:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-04 00:57:28
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { ob } from '@utils/decorators'

function Auction({ type, price, state, amount }) {
  let auctionText = '竞拍中'
  let auctionTextColor = 'warning'
  let auctionSubText = ''
  if (type === 'auction') {
    auctionSubText = `₵${price} / ${formatNumber(amount, 0)}`
    if (state === 1) {
      auctionText = '成功'
      auctionTextColor = 'bid'
    } else if (state === 2) {
      auctionText = '失败'
      auctionTextColor = 'ask'
    }
  }

  return (
    <View>
      <Text type={auctionTextColor} bold align='right'>
        {auctionText}
      </Text>
      <Text style={_.mt.xs} type='tinygrailText' size={12} align='right'>
        {auctionSubText}
      </Text>
    </View>
  )
}

export default ob(Auction)
