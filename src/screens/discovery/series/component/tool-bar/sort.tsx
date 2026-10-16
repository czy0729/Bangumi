/*
 * @Author: czy0729
 * @Date: 2022-06-05 11:47:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:00:21
 *
 * 工具栏: 排序
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { rc } from '@utils/dev'
import { DATA_SORT } from '../../ds'
import { COMPONENT as PARENT } from './ds'

import type { Ctx } from '../../types'

const COMPONENT = rc(PARENT, 'Sort')

function Sort() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { sort } = $.state

  return (
    <ToolBar.Popover
      data={DATA_SORT}
      icon='md-sort'
      iconColor={sort ? _.colorDesc : _.colorSub}
      text={sort || '排序'}
      type={sort ? 'desc' : undefined}
      onSelect={$.onSortSelect}
    />
  )
}

export default observer(Sort)
