/*
 * @Author: czy0729
 * @Date: 2019-09-20 22:05:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-20 23:57:49
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Slider as AntdSlider } from '@ant-design/react-native'
import PropTypes from 'prop-types'
import { Flex, Input, Text, Button } from '@components'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorBid, colorBorder, colorBg, colorText } from '../styles'

function Slider({ style }, { $ }) {
  const { loading, amount } = $.state
  const { balance } = $.assets
  const balanceText = `可用 ${formatNumber(balance)}`
  return (
    <View style={[styles.container, style]}>
      <Flex>
        <Flex.Item>
          <View style={styles.inputWrap}>
            <Input
              style={styles.input}
              keyboardType='numeric'
              value={String(parseInt(amount))}
              onChangeText={$.changeAmount}
            />
          </View>
        </Flex.Item>
        <View style={[styles.btnSubmit, _.ml.sm]}>
          <Button
            style={{
              height: 36
            }}
            type='bid'
            radius={false}
            loading={loading}
            onPress={$.doSubmit}
          >
            确定
          </Button>
        </View>
      </Flex>
      <Text style={[styles.balance, styles.plain]} size={12}>
        {balanceText}
      </Text>
      <View style={[styles.slider, _.mt.sm]}>
        <AntdSlider
          value={amount}
          min={1000}
          max={balance < 1000 ? 1000 : parseInt(balance)}
          step={100}
          maximumTrackTintColor={colorBorder}
          minimumTrackTintColor={colorBid}
          onChange={value => $.changeAmount(value < 1000 ? 1000 : value)}
        />
      </View>
      <Flex>
        <Flex.Item>
          <Text style={styles.text} size={12}>
            {formatNumber(1000, 0)}
          </Text>
        </Flex.Item>
        <Text style={styles.text} size={12}>
          {formatNumber(balance < 1000 ? 1000 : balance, 0)}
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
  container: {
    padding: _.wind,
    backgroundColor: colorBg
  },
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
  btnSubmit: {
    width: 96
  },
  text: {
    color: colorText
  }
})
