/*
 * @Author: czy0729
 * @Date: 2019-11-17 01:37:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-14 02:16:06
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
// import { ActivityIndicator } from '@ant-design/react-native'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber, toFixed } from '@utils'
import { observer } from '@utils/decorators'
import { M } from '@constants'

function Assets(props, { $ }) {
  const {
    // loadingAssets,
    currentBalance,
    currentTotal,
    lastBalance,
    lastTotal,
    short
  } = $.state
  const { balance } = $.assets

  // 缩短
  let _balance = balance
  let _total = $.total
  if (short) {
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
  if (changeBalance > 0) {
    balanceChangeText = `(+${formatNumber(changeBalance, 0)})`
    balanceTextColor = _.colorBid
  } else if (changeBalance < 0) {
    balanceChangeText = `(-${formatNumber(Math.abs(changeBalance), 0)})`
    balanceTextColor = _.colorAsk
  }

  let totalChangeText
  let totalTextColor
  if (changeTotal > 0) {
    totalChangeText = `(+${formatNumber(changeTotal, 0)})`
    totalTextColor = _.colorBid
  } else if (changeTotal < 0) {
    totalChangeText = `(-${formatNumber(Math.abs(changeTotal), 0)})`
    totalTextColor = _.colorAsk
  }

  return (
    <Flex style={styles.assets}>
      <Flex.Item>
        <Touchable onPress={$.toogleShort}>
          <Text
            style={{
              color: _.colorTinygrailPlain
            }}
          >
            ₵{_balance}{' '}
            {balanceChangeText && (
              <Text
                style={{
                  color: balanceTextColor
                }}
                size={12}
                lineHeight={14}
              >
                {balanceChangeText}
              </Text>
            )}{' '}
            / {_total}{' '}
            {totalChangeText && (
              <Text
                style={{
                  color: totalTextColor
                }}
                size={12}
                lineHeight={14}
              >
                {totalChangeText}
              </Text>
            )}
            <Text
              style={{
                color: _.colorTinygrailPlain
              }}
            >
              {short ? ' [-]' : ' [+]'}
            </Text>
          </Text>
        </Touchable>
      </Flex.Item>
      <Touchable style={_.ml.sm} onPress={$.doTest}>
        <Text
          style={{
            color: _.colorTinygrailText
          }}
        >
          [股息预测]
        </Text>
      </Touchable>
    </Flex>
  )
}

Assets.contextTypes = {
  $: PropTypes.object
}

export default observer(Assets)

const styles = StyleSheet.create({
  assets: {
    width: '100%',
    paddingRight: _.wind,
    marginTop: _.md,
    marginBottom: _.md
  }
})
