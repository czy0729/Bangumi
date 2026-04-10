/*
 * @Author: czy0729
 * @Date: 2024-07-30 12:35:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 23:59:53
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { FILTER_TYPE_DS } from '../../ds'

import type { Ctx } from '../../types'

function FilterType() {
  const { $ } = useStore<Ctx>()

  const text = FILTER_TYPE_DS.find(item => item === $.state.filterType)

  const handleSelect = useCallback(
    (title: string) => {
      $.onFilterChange('filterType', title)
    },
    [$]
  )

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
}

export default observer(FilterType)
