/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:18:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 16:14:27
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function More({ $ }: Ctx) {
  const { fixedFilter, fixedPagination } = $?.state || {}
  return (
    <ToolBar.Popover
      data={[
        `选项 · ${fixedFilter ? '锁定上方' : '浮动'}`,
        `分页 · ${fixedPagination ? '锁定下方' : '浮动'}`
      ]}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={16}
      type='desc'
      transparent
      onSelect={title => {
        if (title.includes('选项')) return $.onToggleFixed('fixedFilter')
        if (title.includes('分页')) return $.onToggleFixed('fixedPagination')
      }}
    />
  )
}

export default ob(More, COMPONENT)
