/*
 * @Author: czy0729
 * @Date: 2024-03-20 00:13:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-20 01:48:11
 *
 * 工具栏
 */
import { observer } from 'mobx-react'
import { ToolBar as ToolBarComp } from '@components'
import { useStore } from '@stores'
import Collect from './collect'
import More from './more'
import Sort from './sort'
import Update from './update'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <ToolBarComp>
      <Sort />
      {!!$.catalogDetail.list.length && (
        <>
          <Collect />
          <Update />
        </>
      )}
      <More />
    </ToolBarComp>
  )
}

export default observer(ToolBar)
