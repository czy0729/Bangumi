/*
 * @Author: czy0729
 * @Date: 2024-07-30 12:15:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:11:26
 */
import React, { useCallback } from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { FILTER_YEAR_DS } from '../../ds'

import type { Ctx } from '../../types'

function FilterYear() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const { filterYear } = $.state

    const handleSelect = useCallback((title: string) => {
      $.onFilterChange('filterYear', title)
    }, [])

    return (
      <ToolBar.Popover
        data={FILTER_YEAR_DS}
        iconColor={_.colorDesc}
        text={filterYear === '不限' ? '年份' : String(filterYear)}
        type='desc'
        onSelect={handleSelect}
      />
    )
  })
}

export default FilterYear
