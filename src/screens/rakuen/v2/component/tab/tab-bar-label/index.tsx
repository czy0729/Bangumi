/*
 * @Author: czy0729
 * @Date: 2023-03-15 17:35:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 03:27:42
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_RAKUEN_TYPE_GROUP, MODEL_RAKUEN_TYPE_MONO } from '@constants'
import { TABS } from '../../../ds'
import { Ctx } from '../../../types'
import Label from '../label'
import { COMPONENT } from './ds'

function TabBarLabel({ route, focused }) {
  const { $ } = useStore<Ctx>()
  if (route.title === '小组' && TABS[$.state.page].title === '小组') {
    return (
      <Label
        focused={focused}
        model={MODEL_RAKUEN_TYPE_GROUP}
        label='小组'
        value={$.state.group}
        onSelect={$.onGroupMenuPress}
      />
    )
  }

  if (route.title === '人物' && TABS[$.state.page].title === '人物') {
    return (
      <Label
        focused={focused}
        model={MODEL_RAKUEN_TYPE_MONO}
        label='人物'
        value={$.state.mono}
        onSelect={$.onMonoMenuPress}
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

export default ob(TabBarLabel, COMPONENT)
