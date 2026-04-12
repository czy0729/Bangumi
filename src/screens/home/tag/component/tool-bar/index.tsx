/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-13 06:18:46
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ToolBar as ToolBarComp } from '@components'
import { _, useStore } from '@stores'
import Meta from './meta'
import Month from './month'
import Sort from './sort'
import Year from './year'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <ToolBarComp style={!$.state.list && _.mb.sm}>
      <Sort />
      <Year />
      <Month />
      {($.tag.meta || $.state.meta) && <Meta />}
    </ToolBarComp>
  )
}

export default observer(ToolBar)
