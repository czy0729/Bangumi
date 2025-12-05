/*
 * @Author: czy0729
 * @Date: 2024-07-30 12:15:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:11:26
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { FILTER_YEAR_DS } from '../../ds'
import { Ctx } from '../../types'

function FilterYear() {
  const { $ } = useStore<Ctx>()
  const { filterYear } = $.state
  return (
    <ToolBar.Popover
      data={FILTER_YEAR_DS}
      iconColor={_.colorDesc}
      text={filterYear === '不限' ? '年份' : String(filterYear)}
      type='desc'
      onSelect={(title: string | number) => $.onFilterChange('filterYear', title)}
    />
  )
}

export default ob(FilterYear)
