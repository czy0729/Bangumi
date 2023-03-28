/*
 * @Author: czy0729
 * @Date: 2019-09-20 22:05:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 05:05:24
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Input, Text, Button, Slider as CompSlider } from '@components'
import { _ } from '@stores'
import { formatNumber, stl } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Slider({ style }, { $ }: Ctx) {
  const styles = memoStyles()
  const { loading, amount } = $.state
  const { balance } = $.assets
  return (
    <View style={stl(styles.container, style)}>
      <Flex>
        <Flex.Item>
          <View style={styles.inputWrap}>
            <Input
              style={styles.input}
              keyboardType='numeric'
              value={String(amount)}
              onChangeText={$.changeAmount}
            />
          </View>
        </Flex.Item>
        <View style={[styles.btnSubmit, _.ml.md]}>
          <Button
            style={styles.btnRoot}
            type='bid'
            radius={false}
            loading={loading}
            onPress={$.doSubmit}
          >
            确定
          </Button>
        </View>
      </Flex>
      <Flex style={styles.slider}>
        <View style={_.container.block}>
          <CompSlider
            value={amount}
            min={5000}
            max={balance < 5000 ? 5000 : Number(balance)}
            step={100}
            minimumTrackTintColor={_.colorBid}
            maximumTrackTintColor={_.colorTinygrailBorder}
            onChange={value => $.changeAmount(value < 5000 ? 5000 : value)}
          />
        </View>
      </Flex>
      <Flex>
        <Flex.Item>
          <Text type='tinygrailText' size={12}>
            余额 {formatNumber(5000, 0)}
          </Text>
        </Flex.Item>
        <Text type='tinygrailText' size={12}>
          {formatNumber(balance < 5000 ? 5000 : balance, 0, $.short)}
        </Text>
      </Flex>
    </View>
  )
}

export default obc(Slider)
