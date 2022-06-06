/*
 * @Author: czy0729
 * @Date: 2022-06-06 10:10:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-06 10:39:38
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function More({ onToggleList }, { $ }) {
  const { list, showYear } = $.state
  return (
    <ToolBar.Popover
      data={[
        `布局（${list ? '列表' : '网格'}）`,
        `年份（${showYear ? '显示' : '隐藏'}）`
      ]}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={20}
      type='desc'
      transparent
      onSelect={title => {
        if (title.includes('布局')) return onToggleList()
        if (title.includes('年份')) return $.onToggleShowYear()
      }}
    />
  )
}

export default obc(More)
