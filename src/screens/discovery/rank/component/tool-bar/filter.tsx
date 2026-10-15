/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:35:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 05:51:39
 *
 * 工具栏: 一级分类
 */
import { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT, DATA_FILTER, TEXT_FILTER } from './ds'

import type { RankFilter } from '@types'
import type { Ctx } from '../../types'

const COMPONENT = rc(PARENT, 'Filter')

/** 一级分类 */
function Filter() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const typeCn = $.typeCn as '动画' | '书籍' | '游戏' | '三次元'
  const data = DATA_FILTER[typeCn]

  const memoData = useMemo(() => {
    if (!data) return [] as RankFilter[]

    return data.data.map((item: { label: string }) => item.label) as RankFilter[]
  }, [data])

  const handleSelect = useCallback(
    (title: RankFilter) => {
      $.onFilterSelect(title, data)
    },
    [$, data]
  )

  if (!data) return null

  const { filter } = $.state
  const text: string = data.getLabel(filter)

  return (
    <ToolBar.Popover
      key={typeCn}
      data={memoData}
      text={text === '全部' ? TEXT_FILTER : text}
      type={filter === '' ? undefined : 'desc'}
      onSelect={handleSelect}
      heatmap='排行榜.筛选选择'
    />
  )
}

export default observer(Filter)
