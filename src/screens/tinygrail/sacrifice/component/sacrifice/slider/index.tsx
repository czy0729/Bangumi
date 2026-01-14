/*
 * @Author: czy0729
 * @Date: 2024-03-07 06:57:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:14:53
 */
import React from 'react'
import { Flex, Slider as SliderComp, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { debounce, formatNumber } from '@utils'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Slider() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const { amount } = $.userLogs
    const max = Math.floor(amount)

    return (
      <>
        <Flex style={styles.slider}>
          <Flex.Item>
            <SliderComp
              value={$.state.amount}
              min={0}
              max={max}
              disabled={!max}
              minimumTrackTintColor={_.colorAsk}
              maximumTrackTintColor={_.select(_.colorTinygrailIcon, _.colorTinygrailPlain)}
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
  })
}

export default Slider
