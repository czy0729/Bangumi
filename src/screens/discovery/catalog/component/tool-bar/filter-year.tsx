/*
 * @Author: czy0729
 * @Date: 2024-07-30 12:15:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 年份筛选
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { FILTER_YEAR_DS } from '../../ds'
import { COMPONENT_FILTER_YEAR } from './ds'

import type { Ctx } from '../../types'

function FilterYear() {
  const { $ } = useStore<Ctx>(COMPONENT_FILTER_YEAR)

  const { filterYear } = $.state

  const handleSelect = useCallback(
    (title: string) => {
      $.onFilterChange('filterYear', title)
    },
    [$]
  )

  return (
    <ToolBar.Popover
      data={FILTER_YEAR_DS}
      value={String(filterYear)}
      iconColor={_.colorDesc}
      text={filterYear === '不限' ? '年份' : String(filterYear)}
      type='desc'
      onSelect={handleSelect}
    />
  )
}

export default observer(FilterYear)
