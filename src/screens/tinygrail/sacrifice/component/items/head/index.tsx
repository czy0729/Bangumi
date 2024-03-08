/*
 * @Author: czy0729
 * @Date: 2024-03-08 03:12:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 05:44:09
 */
import React from 'react'
import { Flex, Text } from '@components'
import { formatNumber } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import ExpandBtn from '../../expand-btn'

function Head(props, { $ }: Ctx) {
  const { showItems } = $.state
  const text = []
  if (showItems) {
    const { sacrifices = 0 } = $.userLogs
    const max = parseInt($.myTemple.assets || sacrifices)
    text.push(
      `当前 ${formatNumber($.userLogs.amount || 0, 0)} 股`,
      `固定资产 ${formatNumber(max, 0)}${
        max !== sacrifices ? ` (${formatNumber(sacrifices, 0)})` : ''
      }`
    )
  }

  return (
    <Flex>
      <Flex.Item>
        <Text type='tinygrailPlain' size={13}>
          道具
          {showItems && (
            <Text type='tinygrailText' size={11} lineHeight={13}>
              {' '}
              {text.join(' / ')}
            </Text>
          )}
        </Text>
      </Flex.Item>
      <ExpandBtn show={$.state.showItems} onPress={$.toggleItems} />
    </Flex>
  )
}

export default obc(Head)
