/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:20:00
 *
 * 索引工具栏: 类型 / 年月前后翻页
 */
import { observer } from 'mobx-react'
import { ToolBar as ToolBarComp } from '@components'
import { _, useStore } from '@stores'
import Back from './back'
import Filter from './filter'
import Month from './month'
import Next from './next'
import Year from './year'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <ToolBarComp style={!$.isList && _.mb.sm}>
      <Filter />
      <Back />
      <Year />
      <Month />
      <Next />
    </ToolBarComp>
  )
}

export default observer(ToolBar)
