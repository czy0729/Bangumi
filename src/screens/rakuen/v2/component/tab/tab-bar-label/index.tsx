/*
 * @Author: czy0729
 * @Date: 2023-03-15 17:35:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 11:37:28
 */
import React from 'react'
import { Flex, Text } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { MODEL_RAKUEN_TYPE_GROUP, MODEL_RAKUEN_TYPE_MONO } from '@constants'
import { TABS } from '../../../ds'
import Label from '../label'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function TabBarLabel({ route, focused }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
  })
}

export default TabBarLabel
