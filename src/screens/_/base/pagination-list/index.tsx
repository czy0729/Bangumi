/*
 * @Author: czy0729
 * @Date: 2022-02-24 22:00:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 12:00:00
 *
 * 本地分页长列表入口: 编排 usePagination 与 ListView 渲染
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, ListView } from '@components'
import { r } from '@utils/dev'
import { WEB } from '@constants'
import { usePagination } from './hooks'
import { COMPONENT } from './ds'

import type { ListEmpty } from '@types'
import type { Props as PaginationListProps } from './types'
export type { PaginationListProps }

/** 分页长列表组件主体 */
function PaginationListComponent<ItemT = unknown>({
  forwardRef,
  data,
  limit: _limit = 24,
  onPage,
  onNextPage,
  onFooterRefresh,
  ...other
}: PaginationListProps<ItemT>) {
  r(COMPONENT)

  // 网页端因为页面滚动状态不能保存, 故不使用下拉更多加载
  const limit = WEB ? 100 : _limit

  const { list, onFooterRefresh: handleFooterRefresh } = usePagination<ItemT>({
    data,
    limit,
    onPage,
    onNextPage,
    onFooterRefresh
  })

  return (
    <Component id='base-pagination-list'>
      <ListView
        ref={forwardRef}
        data={list as ListEmpty<ItemT>}
        {...other}
        onFooterRefresh={handleFooterRefresh}
      />
    </Component>
  )
}

/**
 * 支持本地分页的长列表
 *  - 接管调用方的全量 data, 按 limit 切片逐页渲染, 避免一次性全量渲染
 *  - onPage / onNextPage 用于旁路预取下一页数据 (如条目详情、收藏状态), 挂载与数据更新时也会各触发一次
 *  - 调用方传 onFooterRefresh 时为网络分页: footer 触发时先本地翻页, 再接力网络加载,
 *    网络数据追加后 data 引用变化会重新划归 pageTotal, 本地页未耗尽前 footer 不会断流
 *
 * 核心：利用类型断言，将 observer() 包装回支持泛型的组件类型 (同 @components/list-view)
 */
export const PaginationList = observer(PaginationListComponent) as <ItemT = unknown>(
  props: PaginationListProps<ItemT>
) => React.ReactElement

export default PaginationList
