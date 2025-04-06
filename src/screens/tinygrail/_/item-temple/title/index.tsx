/*
 * @Author: czy0729
 * @Date: 2024-03-05 18:17:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-06 19:51:51
 */
import React from 'react'
import { Flex, Text } from '@components'
import { HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import Level from '../../level'
import Rank from '../../rank'

function Title({ style, name, rank, cLevel }) {
  const text = HTMLDecode(name)
  let size = 11
  if (text.length > 4) {
    if (rank) size -= 1
    if (cLevel) size -= 1
  }
  return (
    <Flex style={style}>
      <Rank value={rank} />
      <Level value={cLevel} />
      <Flex.Item>
        <Text type='tinygrailPlain' size={size} bold numberOfLines={1}>
          {text}
        </Text>
      </Flex.Item>
    </Flex>
  )
}

export default ob(Title)
