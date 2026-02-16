/*
 * @Author: czy0729
 * @Date: 2019-11-17 01:37:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 06:18:07
 */
import React from 'react'
import { Flex, Text, TextType, Touchable } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { formatNumber, toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { M } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Assets() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { currentBalance, currentTotal, lastBalance, lastTotal } = $.state
  const { balance, lastIndex } = $.assets

  // 缩短
  let _balance: any = balance
  let _total: any = $.total
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

  let balanceChangeText: string
  let balanceTextColor: TextType
  let _changeBalance: string
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
  } else {
    balanceChangeText = ''
  }

  let totalChangeText: string
  let totalTextColor: TextType
  let _changeTotal: string
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
  } else {
    totalChangeText = ''
  }

  return (
    <Flex style={styles.assets}>
      <Flex.Item>
        <Touchable style={styles.touch} onPress={$.toogleShort}>
          <Text type='tinygrailPlain' size={13} bold>
            {_balance}
            {balanceChangeText && (
              <Text type={balanceTextColor} size={10} lineHeight={13} bold>
                {' '}
                {balanceChangeText}
              </Text>
            )}{' '}
            / {_total}{' '}
            {totalChangeText && (
              <Text type={totalTextColor} size={10} lineHeight={13} bold>
                {totalChangeText}{' '}
              </Text>
            )}
            {!!lastIndex && `/ #${lastIndex}`}
            <Text type='tinygrailPlain' size={13} bold>
              {' '}
              {$.short ? '[-]' : '[+]'}
            </Text>
          </Text>
        </Touchable>
      </Flex.Item>
      <IconTouchable
        style={_.mr._sm}
        name='md-calculate'
        color={_.colorTinygrailPlain}
        onPress={$.doTest}
      />
    </Flex>
  )
}

export default ob(Assets, COMPONENT)
