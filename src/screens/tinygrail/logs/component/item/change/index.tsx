/*
 * @Author: czy0729
 * @Date: 2024-03-11 06:51:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-04 18:35:41
 */
import React from 'react'
import { Flex, Text, TextProps } from '@components'
import { _, systemStore } from '@stores'
import { formatNumber } from '@utils'
import { ob } from '@utils/decorators'

function Item({ desc, change }) {
  let type: TextProps['type']
  if (change > 0) {
    type = 'bid'
  } else if (change < 0) {
    type = 'ask'
  } else {
    type = 'tinygrailText'
  }

  let changeType: TextProps['type']
  let changeNum: string
  if (!change) {
    const match = desc.match(/\d+股/g)
    if (match && match.length) {
      if (['买入', '获得', '获奖'].some(item => desc.includes(item))) {
        changeType = 'bid'
        changeNum = `+${match[0]}`
      } else {
        changeType = 'ask'
        changeNum = `-${match[0]}`
      }
    }
  }

  return (
    <Flex style={_.ml.md} justify='end'>
      {change ? (
        <Text type={type} size={15} bold align='right'>
          {change
            ? `${type === 'bid' ? '+' : '-'}${formatNumber(
                Math.abs(change),
                2,
                systemStore.setting.xsbShort
              )}`
            : ''}
        </Text>
      ) : (
        <Text type={changeType} size={15} bold align='right'>
          {changeNum}
        </Text>
      )}
    </Flex>
  )
}

export default ob(Item)
