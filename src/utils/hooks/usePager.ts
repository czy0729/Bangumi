/*
 * @Author: czy0729
 * @Date: 2020-11-10 16:02:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 08:44:00
 */
import { useEffect, useState } from 'react'

/** 分页列表结构 (与 fetch 层列表模型一致) */
type PagerList<ItemT> = {
  list: ItemT[]
  _list?: ItemT[]
  _loaded?: boolean
  pagination?: {
    page: number
    pageTotal: number
  }
}

const INIT_LIMIT = 20

/**
 * 将长列表按 `limit` 切片做前端分页, 调用 `next` 展示下一页
 *
 * @param list fetch 层返回的列表数据
 * @param finger 变化后重新计算分页的标识 (如下拉刷新计数)
 * @param limit 每页条数, 默认 `20`
 */
export default function usePager<ItemT>(
  list: PagerList<ItemT>,
  finger: unknown,
  limit: number = INIT_LIMIT
) {
  const [state, setState] = useState(pageList(list, limit))
  useEffect(() => {
    if (list._loaded) setState(pageList(list, limit))
  }, [finger, limit, list])
  return {
    /** 分页后的列表数据 */
    list: state,

    /** 展示下一页 */
    next: () => setState(pageList(state, limit))
  }
}

function pageList<ItemT>(list: PagerList<ItemT>, limit: number): PagerList<ItemT> {
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
