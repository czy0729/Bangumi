/*
 * @Author: czy0729
 * @Date: 2021-11-28 08:49:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:01:35
 */
import React from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import { TABS } from '../../ds'
import Filter from './filter'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function FilterWrap({ page }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

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

export default observer(FilterWrap)
