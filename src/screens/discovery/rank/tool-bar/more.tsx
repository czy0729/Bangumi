/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:18:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-03 14:50:52
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function More(props, { $ }) {
  const { list, fixed, fixedPagination, collected } = $.state
  return (
    <ToolBar.Popover
      data={[
        `工具栏 · ${fixed ? '固定' : '浮动'}`,
        `布　局 · ${list ? '列表' : '网格'}`,
        `收　藏 · ${collected ? '显示' : '隐藏'}`,
        `分　页 · ${fixedPagination ? '固定' : '浮动'}`
      ]}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={20}
      type='desc'
      transparent
      onSelect={title => {
        if (title.includes('布　局')) return $.onToggleList()
        if (title.includes('工具栏')) return $.onToggleToolbar('fixed')
        if (title.includes('收　藏')) return $.onToggleToolbar('collected')
        if (title.includes('分　页')) return $.onToggleToolbar('fixedPagination')
      }}
    />
  )
}

export default obc(More)
