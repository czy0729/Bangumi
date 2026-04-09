/*
 * @Author: czy0729
 * @Date: 2024-03-02 04:49:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-23 07:57:52
 */
import React from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import TinygrailToolBar from '@tinygrail/_/tool-bar'
import { SORT_DS } from '../../ds'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if ($.currentKey === 'refine/temple') return null

  return (
    <TinygrailToolBar
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

export default observer(ToolBar)
