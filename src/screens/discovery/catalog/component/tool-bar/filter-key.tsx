/*
 * @Author: czy0729
 * @Date: 2024-07-30 19:11:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 关键字筛选
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { FILTER_KEY_DS } from '../../ds'
import { COMPONENT_FILTER_KEY } from './ds'

import type { Ctx } from '../../types'

const DATA = FILTER_KEY_DS.map(item => `${item[0]} (${item[1]})`)

function FilterKey() {
  const { $ } = useStore<Ctx>(COMPONENT_FILTER_KEY)

  const { filterKey } = $.state

  const handleSelect = useCallback(
    (title: string) => {
      $.onFilterChange('filterKey', title.split(' (')[0])
    },
    [$]
  )

  return (
    <ToolBar.Popover
      data={DATA}
      iconColor={_.colorDesc}
      text={filterKey.includes('不限') ? '关键字' : filterKey}
      type='desc'
      onSelect={handleSelect}
    />
  )
}

export default observer(FilterKey)
