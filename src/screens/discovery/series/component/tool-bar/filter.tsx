/*
 * @Author: czy0729
 * @Date: 2022-06-05 11:50:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:00:07
 *
 * 工具栏: 类型
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { rc } from '@utils/dev'
import { DATA_FILTER } from '../../ds'
import { COMPONENT as PARENT } from './ds'

import type { Ctx } from '../../types'

const COMPONENT = rc(PARENT, 'Filter')

function Filter() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { filter } = $.state

  return (
    <ToolBar.Popover
      data={DATA_FILTER}
      value={filter || '全部'}
      text={filter || '类型'}
      type={filter ? 'desc' : undefined}
      onSelect={$.onFilterSelect}
    />
  )
}

export default observer(Filter)
