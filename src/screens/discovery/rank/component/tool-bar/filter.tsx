/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:35:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:48:50
 */
import React, { useCallback, useMemo } from 'react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { DATA_FILTER } from './ds'

import type { RankFilter } from '@types'
import type { Ctx } from '../../types'

/** 一级分类 */
function Filter() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const typeCn = $.typeCn as '动画' | '书籍' | '游戏' | '三次元'
    const data = DATA_FILTER[typeCn]
    if (!data) return null

    const { filter } = $.state
    const text: string = data.getLabel(filter)

    const memoData = useMemo(() => {
      if (!data?.data) return []

      return data.data.map((item: { label: string }) => item.label)
    }, [data?.data])

    const handleSelect = useCallback(
      (title: RankFilter) => {
        $.onFilterSelect(title, data)
      },
      [data]
    )

    return (
      <ToolBar.Popover
        key={typeCn}
        data={memoData}
        text={text === '全部' ? '分类' : text}
        type={filter === '' ? undefined : 'desc'}
        onSelect={handleSelect}
        heatmap='排行榜.筛选选择'
      />
    )
  })
}

export default Filter
