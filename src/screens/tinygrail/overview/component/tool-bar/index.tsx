/*
 * @Author: czy0729
 * @Date: 2024-03-02 04:49:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-02 04:51:26
 */
import React from 'react'
import { obc } from '@utils/decorators'
import ToolBarComp from '@tinygrail/_/tool-bar'
import { SORT_DS } from '../../ds'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function ToolBar(props, { $ }: Ctx) {
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

export default obc(ToolBar, COMPONENT)
