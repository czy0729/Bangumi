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
import { MODEL_RANK_BOOK_FILTER_SUB, MODEL_RANK_GAME_FILTER_SUB } from '@constants'
import { RankFilterSub } from '@types'
import { Ctx } from '../../types'

const DATA = {
  书籍: MODEL_RANK_BOOK_FILTER_SUB,
  游戏: MODEL_RANK_GAME_FILTER_SUB
} as const

const TEXT = {
  书籍: '系列',
  游戏: '平台'
} as const

/** 二级分类 */
function FilterSub() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const data = DATA[$.typeCn]
    const menuData = useMemo(() => {
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
        key={$.typeCn}
        data={menuData}
        text={text === '全部' ? TEXT[$.typeCn] : text}
        type={filterSub === '' ? undefined : 'desc'}
        onSelect={handleSelect}
        heatmap='排行榜.二级分类选择'
      />
    )
  })
}

export default FilterSub
