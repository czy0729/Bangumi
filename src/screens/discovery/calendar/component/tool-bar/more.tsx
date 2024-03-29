/*
 * @Author: czy0729
 * @Date: 2024-03-29 12:52:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-29 12:55:29
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function More(props, { $ }: Ctx) {
  const { layout, type } = $.state
  return (
    <ToolBar.Popover
      data={[
        `布局 · ${layout === 'list' ? '列表' : '网格'}`,
        `收藏 · ${type === 'all' ? '显示' : '不显示'}`
      ]}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={16}
      type='desc'
      transparent
      onSelect={title => {
        if (title.includes('布局')) return $.onSwitchLayout()
        if (title.includes('收藏')) return $.onToggleType()
      }}
    />
  )
}

export default obc(More)
