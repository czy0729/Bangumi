/*
 * @Author: czy0729
 * @Date: 2024-03-07 20:42:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-19 15:10:08
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { feedback, formatNumber, toFixed } from '@utils'
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
        <Flex>
          <Touchable onPress={$.toggleAuction}>
            <Text style={styles.touch} type='tinygrailPlain' size={13}>
              竞拍
            </Text>
          </Touchable>
          <Touchable
            style={_.ml.sm}
            onPress={() => {
              if (price) {
                $.changeAuctionPrice(toFixed(price + 0.1, 2))
                feedback(true)
              }
            }}
          >
            <Text type='tinygrailText' size={11} lineHeight={13}>
              底价 ({price ? toFixed(price + 0.01, 2) : '-'})
            </Text>
          </Touchable>
        </Flex>
      </Flex.Item>
      <Flex.Item>
        <Flex>
          <Touchable
            style={_.ml._sm}
            onPress={() => {
              if (amount) {
                $.changeAuctionAmount(amount)
                feedback(true)
              }
            }}
          >
            <Text type='tinygrailText' size={11}>
              数量 ({amount ? formatNumber(amount, 0) : '-'} 股)
            </Text>
          </Touchable>
        </Flex>
      </Flex.Item>
    </Flex>
  )
}

export default ob(Head)
