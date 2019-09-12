/*
 * @Author: czy0729
 * @Date: 2019-09-11 17:52:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-12 12:11:44
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Slider as AntdSlider } from '@ant-design/react-native'
import PropTypes from 'prop-types'
import { Flex, Input, Text } from '@components'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorBid, colorBorder } from '../../styles'

function Slider({ style }, { $ }) {
  const { value, amount } = $.state
  const { balance } = $.assets
  const min = 0
  const max = value == 0 ? 0 : parseInt(balance / value)
  return (
    <View style={style}>
      <View style={styles.inputWrap}>
        <Input
          style={styles.input}
          keyboardType='numeric'
          value={String(amount)}
        />
        <Text style={styles.placeholder} size={12} type='sub'>
          数量
        </Text>
      </View>
      <Text style={styles.balance} size={12} type='sub'>
        可用 ₵{formatNumber(balance)}
      </Text>
      <View style={[styles.slider, _.mt.sm]}>
        <AntdSlider
          value={amount}
          min={min}
          max={max}
          maximumTrackTintColor={colorBorder}
          minimumTrackTintColor={colorBid}
          onChange={value => $.changeAmount(value)}
        />
      </View>
      <Flex>
        <Flex.Item>
          <Text size={12} type='sub'>
            {min}
          </Text>
        </Flex.Item>
        <Text size={12} type='sub'>
          {max}
        </Text>
      </Flex>
      <Flex style={_.mt.md}>
        <Flex.Item>
          <Text size={12} type='sub'>
            交易额
          </Text>
        </Flex.Item>
        <Text size={12} type='plain'>
          ₵{amount == 0 ? '--' : formatNumber(amount * value)}
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
  }
})
