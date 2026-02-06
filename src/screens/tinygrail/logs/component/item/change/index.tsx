/*
 * @Author: czy0729
 * @Date: 2024-03-11 06:51:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 07:40:15
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _, systemStore } from '@stores'
import { formatNumber } from '@utils'
import { useObserver } from '@utils/hooks'
import { parseDescChange } from './utils'

import type { TextProps } from '@components'

function Item({ desc, change }) {
  return useObserver(() => {
    if (change) {
      const type: TextProps['type'] = change > 0 ? 'bid' : change < 0 ? 'ask' : 'tinygrailText'

      return (
        <Flex style={[_.ml.md, { minWidth: 56 }]} justify='end'>
          <Text size={15} bold type={type}>
            {`${type === 'bid' ? '+' : '-'}${formatNumber(
              Math.abs(change),
              2,
              systemStore.setting.xsbShort
            )}`}
          </Text>
        </Flex>
      )
    }

    const parsed = parseDescChange(desc)
    if (!parsed) return null

    const textProps = {
      size: parsed.text2 ? 13 : 15,
      bold: true
    } as const

    return (
      <Flex style={[_.ml.md, { minWidth: 56 }]} justify='end'>
        <Text type={parsed.type} {...textProps}>
          {parsed.text}
        </Text>
        {parsed.text2 && (
          <>
            <Text type='tinygrailText' {...textProps}>
              {' / '}
            </Text>
            <Text type={parsed.type2} {...textProps}>
              {parsed.text2}
            </Text>
          </>
        )}
      </Flex>
    )
  })
}

export default Item
