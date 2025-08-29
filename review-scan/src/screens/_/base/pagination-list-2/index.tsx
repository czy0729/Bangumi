/*
 * @Author: czy0729
 * @Date: 2022-02-24 22:00:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-07 17:18:23
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Component, ListView } from '@components'
import { getTimestamp } from '@utils'
import { r } from '@utils/dev'
import { WEB } from '@constants'
import { AnyObject, ListEmpty } from '@types'
import { COMPONENT } from './ds'
import { Props as PaginationList2Props } from './types'

export { PaginationList2Props }

/** 支持分页的长列表 */
export const PaginationList2 = <ItemT extends AnyObject>({
  forwardRef,
  connectRef,
  data,
  limit: _limit = 24,
  onPage,
  onNextPage,
  ...other
}: PaginationList2Props<ItemT>) => {
  r(COMPONENT)

  // 用户记住列表看到多少页, 在触发更新后需要使用此值去重新划归数组当前页数
  const lastPage = useRef(1)

  // 网页端因为页面滚动状态不能保存, 故不使用下拉更多加载
  const limit = WEB ? 100 : _limit

  // 托管列表数据制作分页效果
  const [list, setList] = useState<ListEmpty>({
    list: [],
    pagination: {
      page: lastPage.current,
      pageTotal: 100
    },
    _loaded: false
  })

  const handleFooterRefresh = useCallback(() => {
    const { page, pageTotal } = list.pagination
    if (page >= pageTotal) return true

    const next = data.slice(0, (page + 1) * limit)
    setList({
      ...list,
      list: next,
      pagination: {
        page: page + 1,
        pageTotal: next.length >= limit * page ? pageTotal : page + 1
      }
    })
    lastPage.current = page + 1

    if (typeof onPage === 'function') {
      const nextPage = page + 1
      onPage(data.slice(page * limit, nextPage * limit), nextPage)
    }

    if (typeof onNextPage === 'function') {
      onNextPage(data.slice((page + 1) * limit, (page + 2) * limit))
    }
  }, [data, limit, list, onPage, onNextPage])

  useEffect(() => {
    const list = data.slice(0, lastPage.current * limit)
    setList({
      list,
      pagination: {
        page: lastPage.current,
        pageTotal: Math.floor(data.length / limit) + 1
      },
      _loaded: getTimestamp()
    })

    if (typeof onPage === 'function') {
      onPage(list)
    }

    if (typeof onNextPage === 'function') {
      onNextPage(data.slice(limit, limit * 2))
    }
  }, [data, limit, onPage, onNextPage])

  return (
    <Component id='base-pagination-list' data-version='2'>
      <ListView
        ref={forwardRef || connectRef}
        data={list}
        {...other}
        onFooterRefresh={
          list.pagination.page &&
          list.pagination.pageTotal &&
          list.pagination.page >= list.pagination.pageTotal
            ? undefined
            : handleFooterRefresh
        }
      />
    </Component>
  )
}

export default PaginationList2
