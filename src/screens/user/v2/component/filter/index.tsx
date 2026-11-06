/*
 * @Author: czy0729
 * @Date: 2021-11-28 08:49:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 01:38:34
 *
 * 搜索框外层: 读 store 状态与搜索结果计数
 */
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

  const styles = memoStyles()

  const { subjectType, showFilter, fliterInputText } = $.state
  const { key: type } = TABS[page]
  const isFiltering = $.isFiltering(subjectType, type)

  return (
    <Filter
      styles={styles}
      showFilter={showFilter}
      fliterInputText={fliterInputText}
      isFiltering={isFiltering}
      onFilterChange={$.onFilterChange}
    />
  )
}

export default observer(FilterWrap)
