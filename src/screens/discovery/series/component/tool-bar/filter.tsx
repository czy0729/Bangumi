/*
 * @Author: czy0729
 * @Date: 2022-06-05 11:50:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:00:07
 */
import React from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { DATA_FILTER } from '../../ds'
import { Ctx } from '../../types'

function Filter() {
  const { $ } = useStore<Ctx>()
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

export default ob(Filter)
