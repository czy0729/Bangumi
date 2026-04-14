/*
 * @Author: czy0729
 * @Date: 2022-06-05 12:00:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:00:28
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { DATA_STATUS } from '../../ds'

import type { Ctx } from '../../types'

function Status() {
  const { $ } = useStore<Ctx>()

  const { status } = $.state

  return (
    <ToolBar.Popover
      data={DATA_STATUS}
      text={status || '状态'}
      type={status ? 'desc' : undefined}
      onSelect={$.onStatusSelect}
    />
  )
}

export default observer(Status)
