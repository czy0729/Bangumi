/*
 * @Author: czy0729
 * @Date: 2024-03-07 18:35:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:19:54
 */
import React from 'react'
import { Flex, Slider as SliderComp, Text } from '@components'
import { _, useStore } from '@stores'
import { debounce, formatNumber } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'

function Slider() {
  const { $ } = useStore<Ctx>()
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
}

export default ob(Slider)
