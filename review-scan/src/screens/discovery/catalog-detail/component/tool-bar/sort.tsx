/*
 * @Author: czy0729
 * @Date: 2024-03-20 00:14:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-28 15:33:29
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { SORT_DS } from '../../ds'
import { Ctx } from '../../types'
import { SORT_DATA } from './ds'

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

export default ob(Sort)
