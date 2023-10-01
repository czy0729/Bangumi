/*
 * @Author: czy0729
 * @Date: 2021-02-10 02:55:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-24 18:17:38
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { STORYBOOK } from '@constants'

function Label({ focused, model, label, value, onSelect }) {
  return (
    <Popover
      style={_.container.block}
      data={model.data.map(item => item.label)}
      onSelect={onSelect}
    >
      <Flex style={_.container.block} justify='center'>
        <Text type='title' size={13} bold={focused} noWrap>
          {label}
        </Text>
        {!STORYBOOK && (
          <Text size={10} lineHeight={13} type='sub' noWrap>
            {' '}
            {model.getLabel(value)}{' '}
          </Text>
        )}
      </Flex>
    </Popover>
  )
}

export default ob(Label)
