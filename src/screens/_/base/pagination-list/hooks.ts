/*
 * @Author: czy0729
 * @Date: 2026-08-31 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 12:00:00
 *
 * 本地分页状态 hook: 托管全量 data 按 limit 切片逐页放出, 数据更新后按 lastPage 重新划归当前页
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { getTimestamp } from '@utils'
import { calcPageTotal, clampPage, getPageData, getVisibleList } from './utils'

import type { ListState, UsePaginationOptions, UsePaginationResult } from './types'

/**
 * 本地分页状态管理
 *
 * @param data 调用方的全量数据
 * @param limit 一页渲染个数
 * @param onPage 下一页回调
 * @param onNextPage 下下一页回调 (用于提前加载)
 * @param onFooterRefresh 调用方的网络分页回调, 本地翻页后接力执行
 */
export function usePagination<ItemT>({
  data,
  limit,
  onPage,
  onNextPage,
  onFooterRefresh
}: UsePaginationOptions<ItemT>): UsePaginationResult<ItemT> {
  // 用户记住列表看到多少页, 在触发更新后需要使用此值去重新划归数组当前页数
  const lastPage = useRef(1)

  const [list, setList] = useState<ListState<ItemT>>({
    list: [],
    pagination: {
      page: lastPage.current,
      pageTotal: 100
    },
    _loaded: false
  })

  // 用 ref 持有最新回调, 避免 useCallback / effect 依赖回调引用
  const onPageRef = useRef(onPage)
  onPageRef.current = onPage
  const onNextPageRef = useRef(onNextPage)
  onNextPageRef.current = onNextPage
  const onFooterRefreshRef = useRef(onFooterRefresh)
  onFooterRefreshRef.current = onFooterRefresh

  /** 数据变化后按 lastPage 重新划归切片, 保持用户所在页; 数据缩短时页码向下钳制 */
  useEffect(() => {
    const pageTotal = calcPageTotal(data.length, limit)
    const page = clampPage(lastPage.current, pageTotal)
    const next = getVisibleList(data, page, limit)
    setList({
      list: next,
      pagination: {
        page,
        pageTotal
      },
      _loaded: getTimestamp()
    })

    if (onPageRef.current) {
      onPageRef.current(next, page)
    }

    if (onNextPageRef.current) {
      onNextPageRef.current(getPageData(data, page + 1, limit))
    }
  }, [data, limit])

  /** 上滑加载: 本地翻页 + 旁路预取, 再接力调用方的网络分页 */
  const handleFooterRefresh = useCallback(async () => {
    const { page, pageTotal } = list.pagination
    if (page < pageTotal) {
      const nextPage = page + 1
      setList({
        ...list,
        list: getVisibleList(data, nextPage, limit),
        pagination: {
          page: nextPage,
          pageTotal
        }
      })
      lastPage.current = nextPage

      if (onPageRef.current) {
        onPageRef.current(getPageData(data, nextPage, limit), nextPage)
      }

      if (onNextPageRef.current) {
        onNextPageRef.current(getPageData(data, nextPage + 1, limit))
      }
    }

    await onFooterRefreshRef.current?.()
  }, [data, limit, list])

  return {
    /** 托管后的列表数据 */
    list,

    /** 上滑加载回调 */
    onFooterRefresh: handleFooterRefresh
  }
}
