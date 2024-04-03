/*
 * @Author: czy0729
 * @Date: 2022-06-05 11:50:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 00:40:22
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import { DATA_FILTER } from '../../ds'
import { Ctx } from '../../types'

function Filter(props, { $ }: Ctx) {
  const { filter } = $.state
  return (
    <ToolBar.Popover
      data={DATA_FILTER}
      text={filter || '类型'}
      type={filter ? 'desc' : undefined}
      onSelect={$.onFilterSelect}
    />
  )
}

export default obc(Filter)
