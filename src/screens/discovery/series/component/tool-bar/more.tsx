/*
 * @Author: czy0729
 * @Date: 2022-06-05 12:03:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:00:14
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'

function More() {
  const { $ } = useStore<Ctx>()
  const { fixed } = $.state
  return (
    <ToolBar.Popover
      data={[`筛选（${fixed ? '固定' : '浮动'}）`]}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={16}
      type='desc'
      transparent
      onSelect={title => {
        if (title.includes('筛选')) return $.onToggleFixed()
      }}
    />
  )
}

export default ob(More)
