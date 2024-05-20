/*
 * @Author: czy0729
 * @Date: 2024-03-07 18:35:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-19 15:19:21
 */
import React from 'react'
import { Flex, Slider as SliderComp, Text } from '@components'
import { _ } from '@stores'
import { debounce, formatNumber } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'

function Slider(props, { $ }: Ctx) {
  const max = Number($.myTemple.assets || $.userLogs.sacrifices || 0)
  return (
    <>
      <SliderComp
        value={$.state.starForcesValue}
        min={0}
        max={max}
        disabled={!max}
        minimumTrackTintColor={_.colorAsk}
        maximumTrackTintColor={_.colorTinygrailBorder}
        onChange={debounce($.changeStarForces)}
      />
      <Flex>
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
}

export default obc(Slider)
