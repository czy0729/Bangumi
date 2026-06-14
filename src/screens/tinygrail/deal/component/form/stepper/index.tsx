/*
 * @Author: czy0729
 * @Date: 2019-09-11 17:20:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 12:58:28
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Input, Touchable } from '@components'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

/** 步进器 */
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

export default observer(Stepper)
