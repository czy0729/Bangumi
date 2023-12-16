/*
 * @Author: czy0729
 * @Date: 2020-07-03 15:08:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 04:34:12
 */
import React from 'react'
import { Touchable, Flex, Text } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { tinygrailOSS } from '@utils'
import { ob } from '@utils/decorators'

function ItemBottom({ src, name, level, change, type, onPress }) {
  return (
    <Touchable onPress={onPress}>
      <Flex>
        <Avatar
          src={tinygrailOSS(src)}
          size={40}
          name={name}
          borderColor='transparent'
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
