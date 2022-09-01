/*
 * @Author: czy0729
 * @Date: 2022-06-04 07:25:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 13:58:24
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function More(props, { $ }: Ctx) {
  const { layout, fixed, collected } = $.state
  return (
    <ToolBar.Popover
      data={[
        `布局（${layout === 'list' ? '列表' : '网格'}）`,
        `筛选（${fixed ? '固定' : '浮动'}）`,
        `收藏（${collected ? '显示' : '隐藏'}）`
      ]}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={20}
      type='desc'
      transparent
      onSelect={title => {
        if (title.includes('布局')) return $.switchLayout()
        if (title.includes('筛选')) return $.onToggleFixed()
        if (title.includes('收藏')) return $.onToggleCollected()
      }}
    />
  )
}

export default obc(More)
