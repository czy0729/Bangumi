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
import { obc } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import { Ctx } from '../../types'

function Label({ focused, model, label, value }, { $ }: Ctx) {
  return (
    <Popover
      style={_.container.block}
      data={model.data.map(item => item.label)}
      onSelect={$.onGroupMenuPress}
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

export default obc(Label)
