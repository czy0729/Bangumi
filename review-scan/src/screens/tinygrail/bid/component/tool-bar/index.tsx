/*
 * @Author: czy0729
 * @Date: 2025-01-16 17:09:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-16 17:21:25
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import ToolBarComp from '@tinygrail/_/tool-bar'
import { SORT_DS } from '../../ds'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function ToolBar() {
  const { $ } = useStore<Ctx>()
  return (
    <ToolBarComp
      data={SORT_DS}
      level={$.state.level}
      levelMap={$.levelMap}
      sort={$.state.sort}
      direction={$.state.direction}
      onLevelSelect={$.onLevelSelect}
      onSortPress={$.onSortPress}
    />
  )
}

export default ob(ToolBar, COMPONENT)
