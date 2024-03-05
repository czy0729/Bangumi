/*
 * @Author: czy0729
 * @Date: 2024-03-05 18:17:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 18:48:48
 */
import React from 'react'
import { Flex, Text } from '@components'
import { HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import Level from '../../level'
import Rank from '../../rank'

function Title({ style, name, rank, cLevel }) {
  return (
    <Flex style={style}>
      <Rank value={rank} />
      <Level value={cLevel} />
      <Flex.Item>
        <Text type='tinygrailPlain' size={11} lineHeight={13} bold numberOfLines={1}>
          {HTMLDecode(name)}
        </Text>
      </Flex.Item>
    </Flex>
  )
}

export default ob(Title)
