/*
 * @Author: czy0729
 * @Date: 2023-03-15 17:35:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-26 17:02:37
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_RAKUEN_TYPE_GROUP, MODEL_RAKUEN_TYPE_MONO } from '@constants'
import { Ctx } from '../../types'
import { TABS } from '../../ds'
import Label from '../label'

function TabBarLabel({ route, focused }, { $ }: Ctx) {
  const { page, group, mono } = $.state
  if (route.title === '小组' && TABS[page].title === '小组') {
    return (
      <Label
        focused={focused}
        model={MODEL_RAKUEN_TYPE_GROUP}
        label='小组'
        value={group}
      />
    )
  }

  if (route.title === '人物' && TABS[page].title === '人物') {
    return (
      <Label
        focused={focused}
        model={MODEL_RAKUEN_TYPE_MONO}
        label='人物'
        value={mono}
      />
    )
  }

  return (
    <Flex style={_.container.block} justify='center'>
      <Text type='title' size={13} bold={focused} noWrap>
        {route.title}
      </Text>
    </Flex>
  )
}

export default obc(TabBarLabel)
