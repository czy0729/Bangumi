/*
 * @Author: czy0729
 * @Date: 2019-09-11 17:20:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:12:05
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Input, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function Stepper({ style }, { $ }) {
  const styles = memoStyles()
  const { value } = $.state
  return (
    <Flex style={[styles.stepper, style]}>
      <Flex.Item>
        <Input
          style={styles.input}
          keyboardType='numeric'
          value={String(value)}
          colorClear={_.colorTinygrailText}
          clearButtonMode='never'
          onChangeText={$.changeValue}
        />
      </Flex.Item>
      <Touchable onPress={$.stepMinus}>
        <Flex style={[styles.step, styles.stepMinus]} justify='center'>
          <View style={styles.minus} />
        </Flex>
      </Touchable>
      <View style={styles.split} />
      <Touchable onPress={$.stepPlus}>
        <Flex style={styles.step} justify='center'>
          <View style={styles.minus} />
          <View style={styles.plus} />
        </Flex>
      </Touchable>
    </Flex>
  )
}

export default obc(Stepper)

const memoStyles = _.memoStyles(_ => ({
  stepper: {
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
  step: {
    width: 32,
    height: 32
  },
  stepMinus: {
    borderLeftWidth: 1,
    borderLeftColor: _.colorTinygrailBorder
  },
  split: {
    width: 1,
    height: 14,
    backgroundColor: _.colorTinygrailBorder
  },
  minus: {
    width: 14,
    height: 1,
    backgroundColor: _.colorTinygrailText
  },
  plus: {
    position: 'absolute',
    zIndex: 1,
    top: 9,
    left: 16,
    width: 1,
    height: 14,
    backgroundColor: _.colorTinygrailText
  }
}))
