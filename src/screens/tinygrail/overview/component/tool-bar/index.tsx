/*
 * @Author: czy0729
 * @Date: 2024-03-02 04:49:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 15:42:57
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
  if ($.currentKey === 'refine/temple') return null

  return (
    <ToolBarComp
      data={SORT_DS}
      level={$.state.level}
      levelMap={$.levelMap}
      sort={$.state.sort}
      direction={$.state.direction}
      onLevelSelect={$.onLevelSelect}
      onSortPress={$.onSortPress}
      onSortLongPress={$.onSortLongPress}
    />
  )
}

export default ob(ToolBar, COMPONENT)
