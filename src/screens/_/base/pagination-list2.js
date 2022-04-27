/*
 * @Author: czy0729
 * @Date: 2022-02-24 22:00:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-27 07:46:46
 */
import React, { useState, useEffect, useCallback } from 'react'
import { ListView } from '@components'
import { getTimestamp } from '@utils'

export const PaginationList2 = ({
  data,
  limit = 24,
  onPage = Function.prototype,
  ...other
}) => {
  const [list, setList] = useState({
    list: [],
    pagination: {
      page: 1,
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
    onPage(next)
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
    onPage(list)
  }, [data, limit, onPage])

  return <ListView data={list} {...other} onFooterRefresh={onFooterRefresh} />
}
