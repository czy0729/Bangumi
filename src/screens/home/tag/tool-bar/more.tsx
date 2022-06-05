/*
 * @Author: czy0729
 * @Date: 2022-06-05 15:46:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 15:55:05
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function More(props, { $ }) {
  const { fixed, list, collected } = $.state
  return (
    <ToolBar.Popover
      data={[
        `布局（${list ? '列表' : '网格'}）`,
        `筛选（${fixed ? '固定' : '浮动'}）`,
        `收藏（${collected ? '显示' : '隐藏'}）`
      ]}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={20}
      type='desc'
      transparent
      onSelect={title => {
        if (title.includes('布局')) return $.onToggleList()
        if (title.includes('筛选')) return $.onToggleFixed()
        if (title.includes('收藏')) return $.onToggleCollected()
      }}
    />
  )
}

export default obc(More)
