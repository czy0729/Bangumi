/*
 * @Author: czy0729
 * @Date: 2019-09-11 17:20:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:20:01
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Input, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { ViewStyle } from '@types'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Stepper({ style }: { style?: ViewStyle }) {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { auctionPrice } = $.state
  return (
    <Flex style={style}>
      <Flex.Item>
        <Input
          style={styles.input}
          keyboardType='numeric'
          value={String(auctionPrice)}
          colorClear={_.colorTinygrailText}
          clearButtonMode='never'
          returnKeyType='done'
          returnKeyLabel='竞拍'
          onChangeText={$.changeAuctionPrice}
          onSubmitEditing={$.doAuction}
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

export default ob(Stepper, COMPONENT)
