/*
 * @Author: czy0729
 * @Date: 2019-09-11 17:52:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-28 11:12:35
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Input, Slider as SliderComp, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { formatNumber } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function Slider({ style }) {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { value, amount, isIce } = $.state
  const { balance } = $.assets
  const { amount: userAmount } = $.userLogs
  const min = 0
  let balanceText: string
  if ($.isBid) {
    balanceText = `可用 ${formatNumber(balance, 2, $.short)}`
  } else {
    balanceText = `可用 ${userAmount} 股`
  }

  return (
    <View style={style}>
      <View style={styles.inputWrap}>
        <Input
          style={styles.input}
          keyboardType='numeric'
          value={String(amount)}
          onChangeText={$.changeAmount}
        />
        <Text style={styles.placeholder} type='tinygrailText' size={12}>
          股
        </Text>
      </View>
      <Text style={styles.balance} type='tinygrailPlain' size={12}>
        {balanceText}
      </Text>
      <Flex style={styles.slider}>
        <Flex.Item>
          <View style={styles.sliderWrap}>
            <SliderComp
              value={amount}
              min={min}
              max={$.max}
              minimumTrackTintColor={$.isBid ? _.colorBid : _.colorAsk}
              maximumTrackTintColor={_.select(_.colorTinygrailIcon, _.colorTinygrailPlain)}
              onChange={value => $.changeAmount(value)}
            />
          </View>
        </Flex.Item>
        <Touchable style={_.ml.sm} onPress={() => $.changeAmount($.max)}>
          <Text style={styles.max} type='tinygrailText' size={12}>
            [最大]
          </Text>
        </Touchable>
      </Flex>
      <Flex>
        <Flex.Item>
          <Text type='tinygrailText' size={12}>
            {min}
          </Text>
        </Flex.Item>
        <Text type='tinygrailText' size={12}>
          {formatNumber(Number($.max), 0)}
        </Text>
      </Flex>
      <Flex style={_.mt.md}>
        <Flex.Item>
          <Text type='tinygrailText' size={12}>
            交易额
          </Text>
        </Flex.Item>
        <Text type='tinygrailPlain' size={12}>
          {amount == 0 ? '--' : formatNumber(amount * Number(value), 2, $.short)}
        </Text>
        <Touchable style={_.ml.sm} onPress={$.switchIsIce}>
          <Text type='tinygrailText' size={12}>
            [冰山: {isIce ? '开' : '关'}]
          </Text>
        </Touchable>
      </Flex>
    </View>
  )
}

export default ob(Slider)
