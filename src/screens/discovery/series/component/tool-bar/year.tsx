/*
 * @Author: czy0729
 * @Date: 2022-06-05 11:48:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:00:35
 *
 * 工具栏: 年
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { rc } from '@utils/dev'
import { DATA_AIRTIME } from '@constants'
import { COMPONENT as PARENT } from './ds'

import type { Ctx } from '../../types'

const COMPONENT = rc(PARENT, 'Year')

function Year() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { airtime } = $.state

  return (
    <ToolBar.Popover
      data={DATA_AIRTIME}
      value={airtime || '全部'}
      text={airtime || '年'}
      type={airtime ? 'desc' : undefined}
      onSelect={$.onAirtimeSelect}
    />
  )
}

export default observer(Year)
