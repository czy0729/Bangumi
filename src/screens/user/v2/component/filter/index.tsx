/*
 * @Author: czy0729
 * @Date: 2021-11-28 08:49:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 10:27:49
 */
import React from 'react'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TABS } from '../../ds'
import Filter from './filter'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function FilterWrap({ page }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { subjectType, showFilter, fliterInputText } = $.state
    const { key: type } = TABS[page]
    const isTabActive = $.isTabActive(subjectType, type)
    const isFiltering = $.isFiltering(subjectType, type)

    return (
      <Filter
        styles={memoStyles()}
        showFilter={showFilter}
        fliterInputText={fliterInputText}
        isTabActive={isTabActive}
        isFiltering={isFiltering}
        onFilterChange={$.onFilterChange}
      />
    )
  })
}

export default FilterWrap
