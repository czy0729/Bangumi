/*
 * @Author: czy0729
 * @Date: 2022-06-04 07:01:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:20:00
 *
 * 前一月
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'

import type { Ctx } from '../../types'

function Back() {
  const { $ } = useStore<Ctx>()

  return <ToolBar.Icon icon='md-arrow-back' iconColor={_.colorDesc} onSelect={$.onAirdatePrev} />
}

export default observer(Back)
