/*
 * @Author: czy0729
 * @Date: 2022-06-05 12:03:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 12:17:25
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function More(props, { $ }: Ctx) {
  const { fixed } = $.state
  return (
    <ToolBar.Popover
      data={[`筛选（${fixed ? '固定' : '浮动'}）`]}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={20}
      type='desc'
      transparent
      onSelect={title => {
        if (title.includes('筛选')) return $.onToggleFixed()
      }}
    />
  )
}

export default obc(More)
