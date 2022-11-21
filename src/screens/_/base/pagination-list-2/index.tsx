/*
 * 自动分页的长列表
 *
 * @Author: czy0729
 * @Date: 2022-02-24 22:00:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-14 17:18:09
 */
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ListView } from '@components'
import { getTimestamp } from '@utils'
import { ListEmpty } from '@types'
import { Props as PaginationList2Props } from './types'

export { PaginationList2Props }

export const PaginationList2 = ({
  forwardRef,
  connectRef,
  data,
  limit = 24,
  onPage,
  ...other
}: PaginationList2Props) => {
  // 用户记住列表看到多少页, 在触发更新后需要使用此值去重新划归数组当前页数
  const lastPage = useRef(1)

  // 托管列表数据制作分页效果
  const [list, setList] = useState<ListEmpty>({
    list: [],
    pagination: {
      page: lastPage.current,
      pageTotal: 100
    },
    _loaded: false
  })

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
    lastPage.current = page + 1

    if (typeof onPage === 'function') {
      onPage(data.slice(page * limit, (page + 1) * limit))
    }
  }, [data, limit, list, onPage])

  useEffect(() => {
    const list = data.slice(0, lastPage.current * limit)
    setList({
      list,
      pagination: {
        page: lastPage.current,
        pageTotal: 100
      },
      _loaded: getTimestamp()
    })

    if (typeof onPage === 'function') onPage(list)
  }, [data, limit, onPage])

  return (
    <ListView
      ref={forwardRef || connectRef}
      data={list}
      {...other}
      onFooterRefresh={onFooterRefresh}
    />
  )
}
