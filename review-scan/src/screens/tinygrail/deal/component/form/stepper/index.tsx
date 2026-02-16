/*
 * @Author: czy0729
 * @Date: 2019-09-11 17:20:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-28 11:14:16
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Input, Touchable } from '@components'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function Stepper({ style }) {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { value } = $.state
  return (
    <Flex style={stl(styles.stepper, style)}>
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

export default ob(Stepper)
