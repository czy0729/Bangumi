/*
 * @Author: czy0729
 * @Date: 2019-09-11 17:52:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-20 23:53:47
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Slider as AntdSlider } from '@ant-design/react-native'
import PropTypes from 'prop-types'
import { Flex, Input, Text } from '@components'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorBid, colorAsk, colorBorder, colorText } from '../../styles'

function Slider({ style }, { $ }) {
  const { value, amount } = $.state
  const { balance } = $.assets
  const { amount: userAmount } = $.userLogs

  const min = 0
  let balanceText
  if ($.isBid) {
    balanceText = `可用 ${formatNumber(balance)}`
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
        <Text style={[styles.placeholder, styles.text]} size={12}>
          股
        </Text>
      </View>
      <Text style={[styles.balance, styles.plain]} size={12}>
        {balanceText}
      </Text>
      <View style={[styles.slider, _.mt.sm]}>
        <AntdSlider
          value={amount}
          min={min}
          max={$.max}
          maximumTrackTintColor={colorBorder}
          minimumTrackTintColor={$.isBid ? colorBid : colorAsk}
          onChange={value => $.changeAmount(value)}
        />
      </View>
      <Flex>
        <Flex.Item>
          <Text style={styles.text} size={12}>
            {min}
          </Text>
        </Flex.Item>
        <Text style={styles.text} size={12}>
          {$.max}
        </Text>
      </Flex>
      <Flex style={_.mt.md}>
        <Flex.Item>
          <Text style={styles.text} size={12}>
            交易额
          </Text>
        </Flex.Item>
        <Text style={styles.plain} size={12}>
          {amount == 0 ? '--' : formatNumber(amount * value)}
        </Text>
      </Flex>
    </View>
  )
}

Slider.contextTypes = {
  $: PropTypes.object
}

export default observer(Slider)

const styles = StyleSheet.create({
  inputWrap: {
    paddingLeft: 4,
    borderColor: colorBorder,
    borderWidth: 1
  },
  input: {
    color: _.colorPlain,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0
  },
  placeholder: {
    position: 'absolute',
    top: 8,
    right: 8
  },
  balance: {
    marginTop: 16
  },
  slider: {
    opacity: 0.8
  },
  plain: {
    color: _.colorPlain
  },
  text: {
    color: colorText
  }
})
