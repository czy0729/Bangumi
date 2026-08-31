/*
 * @Author: czy0729
 * @Date: 2021-03-04 00:53:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 04:12:29
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'

import type { TextType } from '@components'

function Auction({
  price,
  state,
  amount
}: {
  /** 竞拍价格 */
  price?: number

  /** 竞拍状态: 1 成功, 2 失败 */
  state?: number

  /** 竞拍数量 */
  amount?: number
}) {
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

export default observer(Auction)
