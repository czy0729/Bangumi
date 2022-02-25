/*
 * @Author: czy0729
 * @Date: 2022-02-24 22:00:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-02-25 13:53:51
 */
import React, { useState, useEffect, useCallback } from 'react'
import { ListView } from '@components'
import { getTimestamp } from '@utils'

export const PaginationList = ({ data, limit = 24, ...other }) => {
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
        pageTotal: next.length >= limit ? 100 : page + 1
      }
    })
  }, [data, limit, list])

  useEffect(() => {
    setList({
      list: data.slice(0, limit),
      pagination: {
        page: 1,
        pageTotal: 100
      },
      _loaded: getTimestamp()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length])

  return <ListView data={list} {...other} onFooterRefresh={onFooterRefresh} />
}
