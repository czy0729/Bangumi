/*
 * @Author: czy0729
 * @Date: 2023-03-15 17:35:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-17 15:57:44
 */
import React from 'react'
import { Flex, Text } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_RAKUEN_TYPE_GROUP, MODEL_RAKUEN_TYPE_MONO } from '@constants'
import { TABS } from '../../../ds'
import { Ctx } from '../../../types'
import Label from '../label'
import { COMPONENT } from './ds'
import { styles } from './styles'

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
    <Flex style={styles.label} justify='center'>
      <Text type='title' size={13} bold={focused} noWrap>
        {route.title}
      </Text>
    </Flex>
  )
}

export default ob(TabBarLabel, COMPONENT)
