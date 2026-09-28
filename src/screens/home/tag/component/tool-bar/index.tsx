/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 筛选工具条: 排序 / 年 / 月 / 公共标签
 */
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
