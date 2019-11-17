/*
 * @Author: czy0729
 * @Date: 2019-09-20 22:05:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-17 19:04:12
 */
import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { Slider as AntdSlider } from '@ant-design/react-native'
import PropTypes from 'prop-types'
import { Flex, Input, Text, Button } from '@components'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorAsk, colorBorder, colorBg, colorText } from '../styles'

function Slider({ style }, { $ }) {
  const { loading, amount } = $.state
  const { amount: userAmount } = $.userLogs
  const balanceText = `可用 ${formatNumber(userAmount, 0)} 股`
  return (
    <View style={[styles.container, style]}>
      <Text
        style={{
          color: colorText
        }}
      >
        融资累计超过500股获得「光辉圣殿」股息+0.2，2500股「闪耀圣殿」股息+0.4，12500股「奇迹圣殿」股息+0.8
      </Text>
      <Flex style={_.mt.md}>
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
            type='ask'
            radius={false}
            loading={loading}
            onPress={() => {
              if (loading) {
                return
              }

              Alert.alert('小圣杯助手', `确定献祭 ${amount}股?`, [
                {
                  text: '取消'
                },
                {
                  text: '确定',
                  onPress: () => $.doSacrifice()
                }
              ])
            }}
          >
            确定
          </Button>
        </View>
      </Flex>
      <Text style={[styles.balance, styles.plain]} size={12}>
        {balanceText}
      </Text>
      <Flex style={[styles.slider, _.mt.sm]}>
        <View style={{ width: '100%' }}>
          <AntdSlider
            value={amount}
            min={0}
            max={parseInt(userAmount)}
            step={1}
            maximumTrackTintColor={colorBorder}
            minimumTrackTintColor={colorAsk}
            onChange={value => $.changeAmount(value)}
          />
        </View>
      </Flex>
      <Flex>
        <Flex.Item>
          <Text style={styles.text} size={12}>
            0
          </Text>
        </Flex.Item>
        <Text style={styles.text} size={12}>
          {formatNumber(userAmount, 0)}
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
    height: 34,
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
    height: 40,
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
