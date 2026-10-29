/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:35:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 05:51:33
 *
 * 工具栏: 二级分类
 */
import { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT, DATA_FILTER_SUB, TEXT_FILTER_SUB } from './ds'

import type { RankFilterSub } from '@types'
import type { Ctx } from '../../types'

const COMPONENT = rc(PARENT, 'FilterSub')

/** 二级分类 */
function FilterSub() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const typeCn = $.typeCn as '书籍' | '游戏'
  const data = DATA_FILTER_SUB[typeCn]

  const memoData = useMemo(() => {
    if (!data) return [] as RankFilterSub[]

    return data.data.map((item: { label: string }) => item.label) as RankFilterSub[]
  }, [data])

  const handleSelect = useCallback(
    (title: RankFilterSub) => {
      $.onFilterSubSelect(title, data)
    },
    [$, data]
  )

  if (!data) return null

  const { filterSub } = $.state
  const text: string = data.getLabel(filterSub)

  return (
    <ToolBar.Popover
      key={typeCn}
      data={memoData}
      value={text}
      text={text === '全部' ? TEXT_FILTER_SUB[typeCn] : text}
      type={filterSub === '' ? undefined : 'desc'}
      onSelect={handleSelect}
      heatmap='排行榜.二级分类选择'
    />
  )
}

export default observer(FilterSub)
