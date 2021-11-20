/*
 * @Author: czy0729
 * @Date: 2020-11-10 16:02:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-20 12:28:07
 */
import { useState, useEffect } from 'react'

const INIT_LIMIT = 20

export default function usePager(list, finger, limit = INIT_LIMIT) {
  const [state, setState] = useState(pageList(list, limit))
  useEffect(() => {
    if (list._loaded) setState(pageList(list, limit))
  }, [finger, limit, list])
  return {
    list: state,
    next: () => setState(pageList(state, limit))
  }
}

function pageList(list, limit) {
  if (!list?._list?.length && list.list.length <= limit) {
    return {
      ...list,
      pagination: {
        page: 1,
        pageTotal: 1
      }
    }
  }

  if (!list?._list?.length) {
    return {
      ...list,
      list: list.list.slice(0, limit),
      _list: list.list,
      pagination: {
        ...list.pagination,
        page: 1,
        pageTotal: Math.floor(list.list.length / limit)
      }
    }
  }

  return {
    ...list,
    list: list._list.slice(0, limit * (list.pagination.page + 1)),
    pagination: {
      ...list.pagination,
      page: list.pagination.page + 1
    }
  }
}
