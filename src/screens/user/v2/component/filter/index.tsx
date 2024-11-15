/*
 * @Author: czy0729
 * @Date: 2021-11-28 08:49:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-31 15:38:53
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import Filter from './filter'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function FilterWrap({ page }) {
  const { $ } = useStore<Ctx>()
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
}

export default ob(FilterWrap, COMPONENT)
