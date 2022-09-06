/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:18:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-06 21:26:53
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function More({ $ }: Ctx) {
  const { fixedFilter, fixedPagination } = $?.state || {}
  return (
    <ToolBar.Popover
      data={[
        `筛选（${fixedFilter ? '固定' : '浮动'}）`,
        `分页（${fixedPagination ? '固定' : '浮动'}）`
      ]}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={20}
      type='desc'
      transparent
      onSelect={title => {
        if (title.includes('筛选')) return $.onToggleFixed('fixedFilter')
        if (title.includes('分页')) return $.onToggleFixed('fixedPagination')
      }}
    />
  )
}

export default obc(More)
