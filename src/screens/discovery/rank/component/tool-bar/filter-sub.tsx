/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:35:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:48:09
 */
import React, { useCallback, useMemo } from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { DATA_FILTER_SUB, TEXT_FILTER_SUB } from './ds'

import type { RankFilterSub } from '@types'
import type { Ctx } from '../../types'

/** 二级分类 */
function FilterSub() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const typeCn = $.typeCn as '书籍' | '游戏'
    const data = DATA_FILTER_SUB[typeCn]

    const memoData = useMemo(() => {
      if (!data?.data) return []

      return data.data.map((item: { label: string }) => item.label)
    }, [data?.data])

    const handleSelect = useCallback(
      (title: RankFilterSub) => {
        $.onFilterSubSelect(title, data)
      },
      [data]
    )

    if (!data) return null

    const { filterSub } = $.state
    const text: string = data.getLabel(filterSub)

    return (
      <ToolBar.Popover
        key={typeCn}
        data={memoData}
        text={text === '全部' ? TEXT_FILTER_SUB[typeCn] : text}
        type={filterSub === '' ? undefined : 'desc'}
        onSelect={handleSelect}
        heatmap='排行榜.二级分类选择'
      />
    )
  })
}

export default FilterSub
