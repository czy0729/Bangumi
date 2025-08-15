/*
 * @Author: czy0729
 * @Date: 2024-03-11 06:51:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-02 15:16:47
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
  let changeType2: TextProps['type']
  let changeNum2: string
  if (!change) {
    const match = desc.match(/\d+股/g)
    if (match && match.length) {
      if (['充能'].some(item => desc.includes(item)) && match?.[1]) {
        changeType = 'ask'
        changeNum = `-${match[0]}`
        changeType2 = 'bid'
        changeNum2 = `+${match[1]}`
      } else if (['买入', '获得', '获奖'].some(item => desc.includes(item))) {
        changeType = 'bid'
        changeNum = `+${match[0]}`
      } else if (['冻结'].some(item => desc.includes(item))) {
        changeType = 'tinygrailText'
        changeNum = `-${match[0]}`
      } else {
        changeType = 'ask'
        changeNum = `-${match[0]}`
      }
    }
  }

  const textProps = {
    size: changeNum2 ? 13 : 15,
    bold: true
  } as const

  return (
    <Flex
      style={[
        _.ml.md,
        {
          minWidth: 56
        }
      ]}
      justify='end'
    >
      {change ? (
        <Text type={type} {...textProps}>
          {change
            ? `${type === 'bid' ? '+' : '-'}${formatNumber(
                Math.abs(change),
                2,
                systemStore.setting.xsbShort
              )}`
            : ''}
        </Text>
      ) : (
        <>
          <Text type={changeType} {...textProps}>
            {changeNum}
          </Text>
          {!!changeNum2 && (
            <>
              <Text type='tinygrailText' {...textProps}>
                {` / `}
              </Text>
              <Text type={changeType2} {...textProps}>
                {changeNum2}
              </Text>
            </>
          )}
        </>
      )}
    </Flex>
  )
}

export default ob(Item)
