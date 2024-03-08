/*
 * @Author: czy0729
 * @Date: 2024-03-07 06:57:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 17:04:16
 */
import React from 'react'
import { Flex, Slider as SliderComp, Text, Touchable } from '@components'
import { _ } from '@stores'
import { debounce, formatNumber } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Slider(props, { $ }: Ctx) {
  const { amount } = $.userLogs
  const max = Math.floor(amount)
  return (
    <>
      <Flex style={styles.slider}>
        <Flex.Item>
          <SliderComp
            value={$.state.amount}
            step={1}
            min={0}
            max={max}
            disabled={!max}
            minimumTrackTintColor={_.colorAsk}
            maximumTrackTintColor={_.colorTinygrailBorder}
            onChange={debounce($.changeAmount)}
          />
        </Flex.Item>
        <Touchable style={_.ml.sm} onPress={() => $.changeAmount(amount)}>
          <Text style={styles.max} type='tinygrailText' size={13}>
            [最大]
          </Text>
        </Touchable>
      </Flex>
      <Flex>
        <Flex.Item>
          <Text type='tinygrailText' size={12}>
            可用 0
          </Text>
        </Flex.Item>
        <Text type='tinygrailText' size={12}>
          {formatNumber(amount, 0)} 股
        </Text>
      </Flex>
    </>
  )
}

export default obc(Slider)
