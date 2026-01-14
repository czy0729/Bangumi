/*
 * @Author: czy0729
 * @Date: 2019-09-11 17:20:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:18:18
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Input, Touchable } from '@components'
import { _, tinygrailStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { WithViewStyles } from '@types'
import type { Ctx } from '../../types'

function Stepper({ style }: WithViewStyles) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
            onSubmitEditing={() => {
              if (tinygrailStore.checkAuth()) $.doAuction()
            }}
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
  })
}

export default Stepper
