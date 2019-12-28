/*
 * @Author: czy0729
 * @Date: 2019-11-17 01:37:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-09 14:54:45
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { ActivityIndicator } from '@ant-design/react-native'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'

function Assets(props, { $ }) {
  const {
    loadingAssets,
    currentBalance,
    currentTotal,
    lastBalance,
    lastTotal
  } = $.state
  const { balance } = $.assets

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
      {loadingAssets ? (
        <ActivityIndicator size='small' />
      ) : (
        <Text
          style={{
            color: _.colorTinygrailPlain
          }}
        >
          ₵
        </Text>
      )}
      <Flex.Item style={_.ml.xs}>
        <Text
          style={{
            color: _.colorTinygrailPlain
          }}
        >
          {formatNumber(balance)}{' '}
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
          / {formatNumber($.total)}{' '}
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
        </Text>
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
