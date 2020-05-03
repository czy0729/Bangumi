/*
 * @Author: czy0729
 * @Date: 2019-09-11 17:52:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-04 01:38:27
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Input, Text, Slider as CompSlider, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'

function Slider({ style }, { $ }) {
  const styles = memoStyles()
  const { value, amount, isIce } = $.state
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
            <CompSlider
              value={amount}
              min={min}
              max={$.max}
              minimumTrackTintColor={$.isBid ? _.colorBid : _.colorAsk}
              maximumTrackTintColor={_.colorTinygrailBorder}
              onChange={value => $.changeAmount(value)}
            />
          </View>
        </Flex.Item>
        <Touchable style={_.ml.sm} onPress={() => $.changeAmount($.max)}>
          <Text style={styles.max} type='tinygrailText' size={13}>
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
          {parseInt($.max)}
        </Text>
      </Flex>
      <Flex style={_.mt.md}>
        <Flex.Item>
          <Text type='tinygrailText' size={12}>
            交易额
          </Text>
        </Flex.Item>
        <Text type='tinygrailPlain' size={12}>
          {amount == 0 ? '--' : formatNumber(amount * value)}
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

Slider.contextTypes = {
  $: PropTypes.object
}

export default observer(Slider)

const memoStyles = _.memoStyles(_ => ({
  inputWrap: {
    paddingLeft: 4,
    borderColor: _.colorTinygrailBorder,
    borderWidth: 1
  },
  input: {
    height: 34,
    color: _.colorTinygrailPlain,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0
  },
  placeholder: {
    position: 'absolute',
    zIndex: 100,
    top: 8,
    right: 8
  },
  balance: {
    marginTop: 16
  },
  slider: {
    height: 40,
    marginTop: _.sm,
    opacity: 0.8
  },
  sliderWrap: {
    width: '100%'
  },
  max: {
    paddingVertical: _.sm
  }
}))
