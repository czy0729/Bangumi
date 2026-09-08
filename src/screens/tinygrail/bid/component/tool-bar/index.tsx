/*
 * @Author: czy0729
 * @Date: 2025-01-16 17:09:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-16 17:21:25
 */
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import ToolBarComp from '@tinygrail/_/tool-bar'
import { SORT_DS } from '../../ds'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

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

export default observer(ToolBar)
