/*
 * @Author: czy0729
 * @Date: 2024-03-07 06:26:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:15:00
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, TextType } from '@components'
import { _, useStore } from '@stores'
import { formatNumber, toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'

function Detail() {
  const { $ } = useStore<Ctx>()
  let color: TextType = 'tinygrailPlain'
  if ($.fluctuation < 0) {
    color = 'ask'
  } else if ($.fluctuation > 0) {
    color = 'bid'
  }

  let fluctuationText = '-%'
  if ($.fluctuation > 0) {
    fluctuationText = `+${toFixed($.fluctuation, 2)}%`
  } else if ($.fluctuation < 0) {
    fluctuationText = `${toFixed($.fluctuation, 2)}%`
  }

  return (
    <View style={[_.container.wind, _.mt.xs]}>
      <Flex justify='center' align='baseline'>
        <Text type='tinygrailPlain' size={15} bold>
          ₵{$.current && toFixed($.current, 1)}
        </Text>
        <Text type={color} align='center' size={12}>
          {' '}
          {fluctuationText}
        </Text>
        <Text type='tinygrailText' align='center' size={12}>
          {' '}
          / 发行价 {toFixed($.issuePrice, 1)} / 市值 {formatNumber($.marketValue, 0, $.short)} /
          流通量 {formatNumber($.total, 0, $.short)}
        </Text>
      </Flex>
      <Text style={_.mt.xs} type='tinygrailText' align='center' size={12} lineHeight={14}>
        持有 {formatNumber(Number($.userLogs.amount), 0)} 股 / 资产{' '}
        {formatNumber(Number($.myTemple.assets || $.userLogs.sacrifices || 0), 0)} (
        {formatNumber(Number($.myTemple.sacrifices || $.userLogs.sacrifices || 0), 0)})
      </Text>
    </View>
  )
}

export default ob(Detail)
