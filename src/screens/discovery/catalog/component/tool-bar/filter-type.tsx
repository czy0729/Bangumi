/*
 * @Author: czy0729
 * @Date: 2024-07-30 12:35:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-30 21:16:39
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { FILTER_TYPE_DS } from '../../ds'
import { Ctx } from '../../types'

function FilterType(props, { $ }: Ctx) {
  const text = FILTER_TYPE_DS.find(item => item === $.state.filterType)
  return (
    <ToolBar.Popover
      data={FILTER_TYPE_DS}
      iconColor={_.colorDesc}
      text={text === '不限' ? '类型' : text}
      type='desc'
      onSelect={(title: string) => $.onFilterChange('filterType', title)}
    />
  )
}

export default obc(FilterType)
