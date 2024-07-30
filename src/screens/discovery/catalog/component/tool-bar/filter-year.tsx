/*
 * @Author: czy0729
 * @Date: 2024-07-30 12:15:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-30 21:16:39
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { FILTER_YEAR_DS } from '../../ds'
import { Ctx } from '../../types'

function FilterYear(props, { $ }: Ctx) {
  const { filterYear } = $.state
  return (
    <ToolBar.Popover
      data={FILTER_YEAR_DS}
      iconColor={_.colorDesc}
      text={filterYear === '不限' ? '年份' : filterYear}
      type='desc'
      onSelect={(title: string) => $.onFilterChange('filterYear', title)}
    />
  )
}

export default obc(FilterYear)
