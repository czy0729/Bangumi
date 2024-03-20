/*
 * @Author: czy0729
 * @Date: 2024-03-20 00:14:12
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-03-20 00:14:12
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { SORT_DS } from '../../ds'
import { Ctx } from '../../types'

function Sort(props, { $ }: Ctx) {
  return (
    <ToolBar.Popover
      data={SORT_DS.map(item => item.title)}
      icon='md-filter-list'
      iconColor={_.colorDesc}
      text={SORT_DS.find(item => item.key === $.state.sort)?.['title']}
      type='desc'
      onSelect={$.onToggleSort}
    />
  )
}

export default obc(Sort)
