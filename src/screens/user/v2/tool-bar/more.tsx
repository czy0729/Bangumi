/*
 * @Author: czy0729
 * @Date: 2022-06-06 10:10:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-05 06:34:49
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function More({ onRefreshOffset }, { $ }: Ctx) {
  const { userPagination } = systemStore.setting
  const { list, showYear } = $.state
  const paginationOption = `分页（${userPagination ? '开启' : '关闭'}）`
  const yearOption = `年份（${showYear ? '显示' : '隐藏'}）`
  return (
    <ToolBar.Popover
      data={
        list
          ? [`布局（列表）`, paginationOption]
          : [`布局（网格）`, paginationOption, yearOption]
      }
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={20}
      type='desc'
      transparent
      onSelect={title => {
        if (title.includes('布局')) return onRefreshOffset()
        if (title.includes('年份')) return $.onToggleShowYear()
        if (title.includes('分页')) {
          systemStore.switchSetting('userPagination')
          $.fetchUserCollectionsNormal(true)
        }
      }}
    />
  )
}

export default obc(More)
