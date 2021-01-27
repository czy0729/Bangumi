/*
 * @Author: czy0729
 * @Date: 2019-11-17 01:37:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:14:57
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber, toFixed } from '@utils'
import { obc } from '@utils/decorators'
import { M } from '@constants'

function Assets(props, { $ }) {
  const {
    // loadingAssets,
    currentBalance,
    currentTotal,
    lastBalance,
    lastTotal
  } = $.state
  const { balance, lastIndex } = $.assets

  // 缩短
  let _balance = balance
  let _total = $.total
  if ($.short) {
    if (_balance > 1000) {
      _balance = `${toFixed(_balance / M, 1)}万`
    } else {
      _balance = formatNumber(_balance, 1)
    }

    if (_total > 1000) {
      _total = `${toFixed(_total / M, 1)}万`
    } else {
      _total = formatNumber(_total, 1)
    }
  } else {
    _balance = formatNumber(_balance, 1)
    _total = formatNumber(_total, 1)
  }

  // 变化
  const changeBalance = currentBalance - lastBalance
  const changeTotal = currentTotal - lastTotal

  let balanceChangeText
  let balanceTextColor
  let _changeBalance
  if ($.short && Math.abs(changeBalance) >= 1000) {
    _changeBalance = `${toFixed(Math.abs(changeBalance) / M, 1)}万`
  } else {
    _changeBalance = formatNumber(Math.abs(changeBalance), 1)
  }

  if (changeBalance > 0) {
    balanceChangeText = `+${_changeBalance}`
    balanceTextColor = 'bid'
  } else if (changeBalance < 0) {
    balanceChangeText = `-${_changeBalance}`
    balanceTextColor = 'ask'
  }

  let totalChangeText
  let totalTextColor
  let _changeTotal
  if ($.short && Math.abs(changeTotal) >= 1000) {
    _changeTotal = `${toFixed(Math.abs(changeTotal) / M, 1)}万`
  } else {
    _changeTotal = formatNumber(Math.abs(changeTotal), 1)
  }

  if (changeTotal > 0) {
    totalChangeText = `+${_changeTotal}`
    totalTextColor = 'bid'
  } else if (changeTotal < 0) {
    totalChangeText = `-${_changeTotal}`
    totalTextColor = 'ask'
  }

  return (
    <Flex style={styles.container}>
      <Flex.Item>
        <Touchable onPress={$.toogleShort}>
          <Text type='tinygrailPlain' size={13}>
            {_balance}
            {balanceChangeText && (
              <Text type={balanceTextColor} size={10} lineHeight={13}>
                {' '}
                {balanceChangeText}
              </Text>
            )}{' '}
            / {_total}{' '}
            {totalChangeText && (
              <Text type={totalTextColor} size={10} lineHeight={13}>
                {totalChangeText}{' '}
              </Text>
            )}
            {!!lastIndex && `/ #${lastIndex}`}
            <Text type='tinygrailPlain' size={13}>
              {' '}
              {$.short ? '[-]' : '[+]'}
            </Text>
          </Text>
        </Touchable>
      </Flex.Item>
      <Touchable style={_.ml.xs} onPress={$.doTest}>
        <Text type='tinygrailText' size={13}>
          [股息预测]
        </Text>
      </Touchable>
    </Flex>
  )
}

export default obc(Assets)

const styles = _.create({
  container: {
    width: '100%',
    paddingVertical: _.sm,
    paddingRight: _.wind
  }
})
