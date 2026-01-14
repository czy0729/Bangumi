/*
 * @Author: czy0729
 * @Date: 2024-03-07 18:35:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:17:00
 */
import React from 'react'
import { Flex, Slider as SliderComp, Text } from '@components'
import { _, useStore } from '@stores'
import { debounce, formatNumber } from '@utils'
import { useObserver } from '@utils/hooks'

import type { Ctx } from '../../../types'

function Slider() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const max = Number($.myTemple.assets || $.userLogs.sacrifices || 0)

    return (
      <>
        <SliderComp
          value={$.state.starForcesValue}
          min={0}
          max={max}
          disabled={!max}
          minimumTrackTintColor={_.colorAsk}
          maximumTrackTintColor={_.select(_.colorTinygrailIcon, _.colorTinygrailPlain)}
          onChange={debounce($.changeStarForces)}
        />
        <Flex style={_.mt.sm}>
          <Flex.Item>
            <Text type='tinygrailText' size={12}>
              可用 0
            </Text>
          </Flex.Item>
          <Text type='tinygrailText' size={12}>
            {formatNumber(max, 0)} 塔
          </Text>
        </Flex>
      </>
    )
  })
}

export default Slider
