/*
 * @Author: czy0729
 * @Date: 2024-03-07 20:42:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 21:15:38
 */
import React from 'react'
import { Flex, Text } from '@components'
import { formatNumber, toFixed } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import ExpandBtn from '../../expand-btn'

function Head(props, { $ }: Ctx) {
  const { showAuction } = $.state
  const { price = 0, amount } = $.valhallChara
  return (
    <Flex>
      <Flex.Item flex={1.2}>
        <Text type='tinygrailPlain' size={13}>
          竞拍
          {showAuction && (
            <Text type='tinygrailText' size={11} lineHeight={13}>
              {'  '}
              底价 ({price ? toFixed(price + 0.01, 2) : '-'})
            </Text>
          )}
        </Text>
      </Flex.Item>
      {showAuction && (
        <Flex.Item>
          <Text type='tinygrailText' size={11}>
            数量 ({amount ? formatNumber(amount, 0) : '-'} 股)
          </Text>
        </Flex.Item>
      )}
      <ExpandBtn show={showAuction} onPress={$.toggleAuction} />
    </Flex>
  )
}

export default obc(Head)
