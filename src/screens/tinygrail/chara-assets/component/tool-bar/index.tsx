/*
 * @Author: czy0729
 * @Date: 2024-03-05 02:59:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 03:10:46
 */
import React from 'react'
import { obc } from '@utils/decorators'
import ToolBarComp from '@tinygrail/_/tool-bar'
import { SORT_DS } from '../../ds'
import { Ctx } from '../../types'
import BatchBtn from '../batch-btn'
import { COMPONENT } from './ds'

function ToolBar(props, { $ }: Ctx) {
  if ($.state.page > 1) return null

  return (
    <ToolBarComp
      data={SORT_DS}
      level={$.state.level}
      levelMap={$.levelMap}
      sort={$.state.sort}
      direction={$.state.direction}
      renderLeft={<BatchBtn />}
      onLevelSelect={$.onLevelSelect}
      onSortPress={$.onSortPress}
    />
  )
}

export default obc(ToolBar, COMPONENT)
