/*
 * @Author: czy0729
 * @Date: 2024-03-07 16:57:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 17:02:25
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Flex, Input, Text } from '@components'
import { _ } from '@stores'
import { confirm, formatNumber } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function Amount(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { loading, amount } = $.state
  const { sacrifices = 0 } = $.userLogs
  return (
    <Flex style={_.mt.sm}>
      <Flex.Item>
        <View style={styles.inputWrap}>
          <Input
            style={styles.input}
            keyboardType='numeric'
            value={String(Math.floor(amount))}
            clearButtonMode='never'
            onChangeText={$.changeAmount}
          />
          {!!sacrifices && (
            <Text style={styles.sacrifices} type='ask' size={12} pointerEvents='none'>
              已献祭 {formatNumber(sacrifices, 0)} 股
            </Text>
          )}
        </View>
      </Flex.Item>
      <View style={styles.btnSubmit}>
        <Button
          style={styles.btnAsk}
          type='ask'
          radius={false}
          loading={loading}
          onPress={() => {
            if (loading) return

            confirm(`确定献祭 ${amount}股?`, () => $.doSacrifice(), '小圣杯助手')
          }}
        >
          确定
        </Button>
      </View>
    </Flex>
  )
}

export default obc(Amount)
