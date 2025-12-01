/*
 * @Author: czy0729
 * @Date: 2024-07-30 12:35:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:09:58
 */
import React, { useCallback } from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { FILTER_TYPE_DS } from '../../ds'

import type { Ctx } from '../../types'

function FilterType() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const text = FILTER_TYPE_DS.find(item => item === $.state.filterType)

    const handleSelect = useCallback((title: string) => {
      $.onFilterChange('filterType', title)
    }, [])

    return (
      <ToolBar.Popover
        data={FILTER_TYPE_DS}
        icon='md-filter-list'
        iconColor={_.colorDesc}
        text={text === '不限' ? '类型' : text}
        type='desc'
        onSelect={handleSelect}
      />
    )
  })
}

export default FilterType
