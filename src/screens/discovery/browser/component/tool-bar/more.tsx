/*
 * @Author: czy0729
 * @Date: 2022-06-04 07:25:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:58:58
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'

function More() {
  const { $ } = useStore<Ctx>()
  const { layout, fixed, collected } = $.state
  return (
    <ToolBar.Popover
      data={[
        `选项 · ${fixed ? '锁定上方' : '浮动'}`,
        `布局 · ${layout === 'list' ? '列表' : '网格'}`,
        `收藏 · ${collected ? '显示' : '不显示'}`
      ]}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={16}
      type='desc'
      transparent
      onSelect={title => {
        if (title.includes('选项')) return $.onToggleFixed()
        if (title.includes('布局')) return $.switchLayout()
        if (title.includes('收藏')) return $.onToggleCollected()
      }}
    />
  )
}

export default ob(More)
