/*
 * @Author: czy0729
 * @Date: 2021-03-03 22:55:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-06 06:00:10
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import Rank from '../rank'

function Title({ rank, name, level, bonus }) {
  return (
    <Flex wrap='wrap'>
      <Rank value={rank} />
      <Text
        type='tinygrailPlain'
        size={name.length > 12 ? 10 : name.length > 8 ? 12 : 14}
        lineHeight={14}
        bold
      >
        {name}
      </Text>
      {parseInt(level) > 1 && (
        <Text style={_.ml.xs} type='ask' size={11} lineHeight={14} bold>
          lv{level}
        </Text>
      )}
      {!!bonus && (
        <Text style={_.ml.xs} type='warning' size={11} lineHeight={14} bold>
          x{bonus}
        </Text>
      )}
    </Flex>
  )
}

export default ob(Title)
