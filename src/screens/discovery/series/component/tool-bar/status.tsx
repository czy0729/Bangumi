/*
 * @Author: czy0729
 * @Date: 2022-06-05 12:00:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 00:40:29
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import { DATA_STATUS } from '../../ds'
import { Ctx } from '../../types'

function Status(props, { $ }: Ctx) {
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

export default obc(Status)
