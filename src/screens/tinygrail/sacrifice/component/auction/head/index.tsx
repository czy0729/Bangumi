/*
 * @Author: czy0729
 * @Date: 2024-03-07 20:42:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-28 20:44:38
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { formatNumber, toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Head() {
  const { $ } = useStore<Ctx>()
  const { showAuction } = $.state
  if (!showAuction) {
    return (
      <Touchable onPress={$.toggleAuction}>
        <Text style={styles.touch} type='tinygrailPlain' size={13} align='center'>
          竞拍
        </Text>
      </Touchable>
    )
  }

  const { price = 0, amount } = $.valhallChara
  return (
    <Flex>
      <Flex.Item>
        <Touchable onPress={$.toggleAuction}>
          <Text style={styles.touch} type='tinygrailPlain' size={13}>
            竞拍
            <Text type='tinygrailText' size={11} lineHeight={13}>
              {'  '}
              底价 ({price ? toFixed(price + 0.01, 2) : '-'})
            </Text>
          </Text>
        </Touchable>
      </Flex.Item>
      <Flex.Item>
        <Text style={_.ml._sm} type='tinygrailText' size={11}>
          数量 ({amount ? formatNumber(amount, 0) : '-'} 股)
        </Text>
      </Flex.Item>
    </Flex>
  )
}

export default ob(Head)
