/*
 * @Author: czy0729
 * @Date: 2024-07-30 19:11:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-30 21:16:38
 */
import React, { useMemo } from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { c } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import { FILTER_KEY_DS } from '../../ds'
import { Ctx } from '../../types'

function FilterKey(props, { $ }: Ctx) {
  const data = useMemo(() => FILTER_KEY_DS.map(item => `${item[0]} (${item[1]})`), [])
  return useObserver(() => {
    const { filterKey } = $.state
    return (
      <ToolBar.Popover
        data={data}
        iconColor={_.colorDesc}
        text={filterKey.includes('不限') ? '关键字' : filterKey}
        type='desc'
        onSelect={(title: string) => $.onFilterChange('filterKey', title.split(' (')?.[0])}
      />
    )
  })
}

export default c(FilterKey)
