/*
 * @Author: czy0729
 * @Date: 2021-03-04 00:53:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-07 16:59:39
 */
import React from 'react'
import { View } from 'react-native'
import { Text, TextType } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { ob } from '@utils/decorators'
import { AnyObject } from '@types'

function Auction({ price, state, amount }: AnyObject) {
  let text = '竞拍中'
  let color: TextType = 'warning'
  if (state === 1) {
    text = '成功'
    color = 'bid'
  } else if (state === 2) {
    text = '失败'
    color = 'ask'
  }

  return (
    <View
      style={{
        marginRight: text === '竞拍中' ? 40 : 12
      }}
    >
      <Text type={color} bold align='right'>
        {text}
      </Text>
      <Text style={_.mt.xs} type='tinygrailText' size={12} lineHeight={13} align='right'>
        ₵{price} / {formatNumber(amount, 0)}
      </Text>
    </View>
  )
}

export default ob(Auction)
