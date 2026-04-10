/*
 * @Author: czy0729
 * @Date: 2024-03-20 00:14:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 05:07:26
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { SORT_DS } from '../../ds'
import { SORT_DATA } from './ds'

import type { Ctx } from '../../types'

function Sort() {
  const { $ } = useStore<Ctx>()

  return (
    <ToolBar.Popover
      data={SORT_DATA}
      icon='md-sort'
      iconColor={_.colorDesc}
      text={SORT_DS.find(item => item.key === $.state.sort)?.['title']}
      type='desc'
      onSelect={$.onToggleSort}
    />
  )
}

export default observer(Sort)
