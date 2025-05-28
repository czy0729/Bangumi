/*
 * @Author: czy0729
 * @Date: 2024-03-08 03:12:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-28 20:49:02
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { formatNumber } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Head() {
  const { $ } = useStore<Ctx>()
  const { showItems } = $.state
  if (!showItems) {
    return (
      <Touchable onPress={$.toggleItems}>
        <Text style={styles.touch} type='tinygrailPlain' size={13} align='center'>
          道具
        </Text>
      </Touchable>
    )
  }

  const text = []
  const { sacrifices = 0 } = $.userLogs
  const max = Math.floor($.myTemple.assets || sacrifices)
  text.push(
    `当前 ${formatNumber($.userLogs.amount || 0, 0)} 股`,
    `固定资产 ${formatNumber(max, 0)}${
      max !== sacrifices ? ` (${formatNumber(sacrifices, 0)})` : ''
    }`
  )

  return (
    <Flex style={_.mb.sm}>
      <Flex.Item>
        <Touchable onPress={$.toggleItems}>
          <Text style={styles.touch} type='tinygrailPlain' size={13}>
            道具
            <Text type='tinygrailText' size={11} lineHeight={13}>
              {' '}
              {text.join(' / ')}
            </Text>
          </Text>
        </Touchable>
      </Flex.Item>
    </Flex>
  )
}

export default ob(Head)
