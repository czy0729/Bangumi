/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:34:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:49:19
 *
 * 工具栏: 月
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { rc } from '@utils/dev'
import { DATA_MONTH } from '@constants'
import { COMPONENT as PARENT } from './ds'

import type { Ctx } from '../../types'

const COMPONENT = rc(PARENT, 'Month')

/** 月 */
function Month() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.airtime) return null

  return (
    <ToolBar.Popover
      data={DATA_MONTH}
      value={$.state.month}
      text={$.month ? `${$.month}月` : '月'}
      type={$.month === '' ? undefined : 'desc'}
      onSelect={$.onMonthSelect}
      heatmap='排行榜.月选择'
    />
  )
}

export default observer(Month)
