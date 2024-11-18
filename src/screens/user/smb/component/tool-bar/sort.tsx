/*
 * @Author: czy0729
 * @Date: 2023-09-23 10:53:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:31:29
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { ACTIONS_SORT } from '../../ds'
import { Ctx } from '../../types'

function Sort() {
  const { $ } = useStore<Ctx>()
  const { sort } = $.state
  return (
    <ToolBar.Popover
      data={ACTIONS_SORT}
      icon='md-sort'
      iconColor={_.colorDesc}
      text={sort}
      type='desc'
      onSelect={title => {
        setTimeout(() => {
          $.onSelectSort(title)
        }, 0)
      }}
    />
  )
}

export default ob(Sort)
