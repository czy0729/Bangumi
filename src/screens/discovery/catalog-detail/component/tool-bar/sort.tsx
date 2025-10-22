/*
 * @Author: czy0729
 * @Date: 2024-03-20 00:14:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 01:23:34
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { SORT_DS } from '../../ds'
import { SORT_DATA } from './ds'

import type { Ctx } from '../../types'

function Sort() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <ToolBar.Popover
      data={SORT_DATA}
      icon='md-sort'
      iconColor={_.colorDesc}
      text={SORT_DS.find(item => item.key === $.state.sort)?.['title']}
      type='desc'
      onSelect={$.onToggleSort}
    />
  ))
}

export default Sort
