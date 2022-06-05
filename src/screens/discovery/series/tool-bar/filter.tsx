/*
 * @Author: czy0729
 * @Date: 2022-06-05 11:50:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 11:57:17
 */
/*
 * @Author: czy0729
 * @Date: 2022-04-19 17:07:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 11:48:47
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import { DATA_FILTER } from '../store'

function Filter(props, { $ }) {
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
