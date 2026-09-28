/*
 * @Author: czy0729
 * @Date: 2025-12-05 06:54:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 20:00:00
 *
 * 类型筛选工具条: 选项按条目类型归并计数 (utils), 下拉选择后派发 onFilter
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { ToolBar as ToolBarComp } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { buildFilterData, parseFilterValue } from './utils'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { list } = $

  /** [类型〔数量〕, ...] */
  const data = buildFilterData(list)

  const handleSelect = useCallback(
    (value: string) => {
      $.onFilter(parseFilterValue(value))
    },
    [$]
  )

  if (!data.length) return null

  const { filter } = $.state
  const text = filter ? data.find(item => parseFilterValue(item) === filter) : ''

  return (
    <ToolBarComp style={styles.toolBar}>
      <ToolBarComp.Popover
        data={data}
        text={text || data[0]}
        type='desc'
        onSelect={handleSelect}
      />
    </ToolBarComp>
  )
}

export default observer(ToolBar)
