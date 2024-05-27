/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:18:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-27 10:53:22
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function More(props, { $ }: Ctx) {
  const { list, fixed, fixedPagination, collected } = $.state
  return (
    <ToolBar.Popover
      data={[
        `选项 · ${fixed ? '锁定上方' : '浮动'}`,
        `布局 · ${list ? '列表' : '网格'}`,
        `收藏 · ${collected ? '显示' : '不显示'}`,
        `分页 · ${fixedPagination ? '锁定下方' : '浮动'}`
      ]}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={16}
      type='desc'
      transparent
      onSelect={(title: string) => {
        if (title.includes('选项')) return $.onToggleToolbar('fixed')
        if (title.includes('布局')) return $.onToggleList()
        if (title.includes('收藏')) return $.onToggleToolbar('collected')
        if (title.includes('分页')) return $.onToggleToolbar('fixedPagination')
      }}
    />
  )
}

export default obc(More)
