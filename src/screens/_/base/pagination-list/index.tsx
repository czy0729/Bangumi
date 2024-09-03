/*
 * @Author: czy0729
 * @Date: 2022-02-24 22:00:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-03 15:09:47
 */
import React, { useCallback, useEffect, useState } from 'react'
import { Component, ListView } from '@components'
import { getTimestamp } from '@utils'
import { r } from '@utils/dev'
import { WEB } from '@constants'
import { ListEmpty } from '@types'
import { COMPONENT } from './ds'
import { Props as PaginationListProps } from './types'
import './styles'

export { PaginationListProps }

/** @deprecated 更新频率极低 (只认 data.length) 的自动分页的长列表 */
export const PaginationList = <ItemT extends any[]>({
  forwardRef,
  data,
  limit: _limit = 24,
  onPage,
  ...other
}: PaginationListProps<ItemT>) => {
  r(COMPONENT)

  const [list, setList] = useState<ListEmpty>({
    list: [],
    pagination: {
      page: 1,
      pageTotal: 100
    },
    _loaded: false
  })

  // 网页端因为页面滚动状态不能保存, 故不使用下拉更多加载
  const limit = WEB ? 100 : _limit

  const onFooterRefresh = useCallback(() => {
    const { page, pageTotal } = list.pagination
    if (page >= pageTotal) return true

    const next = data.slice(0, (page + 1) * limit)
    setList({
      ...list,
      list: next,
      pagination: {
        page: page + 1,
        pageTotal: next.length >= limit * page ? 100 : page + 1
      }
    })
    if (typeof onPage === 'function') onPage(next)
  }, [data, limit, list, onPage])

  useEffect(() => {
    const list = data.slice(0, limit)
    setList({
      list,
      pagination: {
        page: 1,
        pageTotal: 100
      },
      _loaded: getTimestamp()
    })

    if (typeof onPage === 'function') onPage(list)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length, onPage])

  return (
    <Component id='base-pagination-list'>
      <ListView ref={forwardRef} data={list} {...other} onFooterRefresh={onFooterRefresh} />
    </Component>
  )
}

export default PaginationList
