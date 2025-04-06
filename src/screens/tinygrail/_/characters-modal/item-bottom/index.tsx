/*
 * @Author: czy0729
 * @Date: 2020-07-03 15:08:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-06 19:15:29
 */
import React from 'react'
import { Avatar, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { tinygrailOSS } from '@utils'
import { ob } from '@utils/decorators'

function ItemBottom({ src, name, level, change, type, onPress }) {
  return (
    <Touchable onPress={onPress}>
      <Flex>
        <Avatar
          key={tinygrailOSS(src)}
          src={tinygrailOSS(src)}
          size={32}
          name={name}
          borderColor='transparent'
          skeletonType='tinygrail'
        />
        <Flex.Item style={_.ml.sm}>
          <Text type='tinygrailPlain' size={10} bold numberOfLines={1}>
            <Text type='ask' size={10} bold>
              lv{level}{' '}
            </Text>
            {name}
          </Text>
          <Text style={_.mt.xs} type={type} size={9}>
            {change}
          </Text>
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

export default ob(ItemBottom)
