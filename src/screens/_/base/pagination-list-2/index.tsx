/*
 * @Author: czy0729
 * @Date: 2022-02-24 22:00:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:52:20
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import { Component, ListView } from '@components'
import { ON_END_REACHED_THROTTLE } from '@components/list-view/ds'
import { getTimestamp, sleep } from '@utils'
import { r } from '@utils/dev'
import { WEB } from '@constants'
import { COMPONENT } from './ds'
import { nextFrame, setRef } from './utils'

import type { AnyObject, ListEmpty } from '@types'
import type { Props as PaginationList2Props } from './types'
export type { PaginationList2Props }

/** 支持分页的长列表 */
export const PaginationList2 = observer(
  <ItemT extends AnyObject>({
    forwardRef,
    connectRef,
    data,
    limit: _limit = 24,
    onPage,
    onNextPage,
    onScrollBeginDrag,
    enableScrollToIndexLoadMore = false,
    ...other
  }: PaginationList2Props<ItemT>) => {
    r(COMPONENT)

    // 用户记住列表看到多少页, 在触发更新后需要使用此值去重新划归数组当前页数
    const lastPage = useRef(1)

    // 网页端因为页面滚动状态不能保存, 故不使用下拉更多加载
    const limit = WEB ? 100 : _limit

    // 托管列表数据制作分页效果
    const initList = {
      list: [],
      pagination: {
        page: lastPage.current,
        pageTotal: 100
      },
      _loaded: false
    } as ListEmpty
    const [list, setListState] = useState<ListEmpty>(initList)

    // listRef 同步 list state, 使异步流程中始终读到最新分页状态
    const listRef = useRef<ListEmpty>(initList)

    // enableScrollToIndexLoadMore 相关引用, 用于代理 scrollToIndex 和自动逐页加载
    const listViewRef = useRef<any>(null)
    const scrollToIndexRef = useRef<any>(null)
    const scrollToIndexId = useRef(0)
    const scrollToIndexCanceled = useRef(false)
    const loadMorePromiseRef = useRef<Promise<boolean>>(null)
    const onEndReachedRef = useRef(false)

    // data/limit 可能在组件生命周期中变化, 用 ref 跟踪最新值
    const dataLengthRef = useRef(data.length)
    const limitRef = useRef(limit)
    dataLengthRef.current = data.length
    limitRef.current = limit

    const setList = useCallback((next: ListEmpty) => {
      listRef.current = next
      setListState(next)
    }, [])

    const handleFooterRefresh = useCallback(() => {
      const { page, pageTotal } = listRef.current.pagination
      if (page >= pageTotal) return true

      const next = data.slice(0, (page + 1) * limit)
      setList({
        ...listRef.current,
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
    }, [data, limit, onPage, onNextPage, setList])

    // 触发 ListView.onFooterRefresh() 扩展下一页本地切片
    // 使用 loadMorePromiseRef 防止同一页重复加载
    const handleLoadMore = useCallback(() => {
      if (loadMorePromiseRef.current) return loadMorePromiseRef.current

      const listView = listViewRef.current
      if (typeof listView?.onFooterRefresh !== 'function') return Promise.resolve(false)

      const page = listRef.current.pagination.page
      loadMorePromiseRef.current = Promise.resolve(listView.onFooterRefresh())
        .then(nextFrame)
        .then(() => listRef.current.pagination.page > page)
        .finally(() => {
          loadMorePromiseRef.current = null
        })

      return loadMorePromiseRef.current
    }, [])

    // opt-in 路径接管 ListView 的 onEndReached, 模仿原触底节流语义
    // 触发后锁 ON_END_REACHED_THROTTLE ms, 期间不重复调用
    const handleEndReached = useCallback(() => {
      if (onEndReachedRef.current) return

      const { page, pageTotal } = listRef.current.pagination
      if (!page || !pageTotal || page >= pageTotal) return

      onEndReachedRef.current = true
      handleLoadMore()
      setTimeout(() => {
        onEndReachedRef.current = false
      }, ON_END_REACHED_THROTTLE)
    }, [handleLoadMore])

    // 等待下一页加载完成: 先给自然 onEndReached 120ms 窗口, 未触发则兜底手动加载
    const waitForNextPage = useCallback(async () => {
      const page = listRef.current.pagination.page
      await sleep(120)

      if (loadMorePromiseRef.current) await loadMorePromiseRef.current
      if (listRef.current.pagination.page > page) return true

      return handleLoadMore()
    }, [handleLoadMore])

    // 代理 scrollToIndex: 目标 index 在当前切片内则直接跳转, 否则逐页加载到目标页后跳转
    const handleScrollToIndex = useCallback(
      async params => {
        const id = ++scrollToIndexId.current
        scrollToIndexCanceled.current = false

        const { index } = params || {}
        const target = Number(index)
        if (!Number.isFinite(target)) {
          scrollToIndexRef.current?.(params)
          return
        }

        const { list: currentList } = listRef.current
        if (target < currentList.length) {
          // 目标已在当前切片内, 直接跳转
          scrollToIndexRef.current?.(params)
          return
        }

        if (!dataLengthRef.current || target >= dataLengthRef.current) {
          // 目标超出完整数据范围, 降级到当前已加载底部
          if (currentList.length) {
            scrollToIndexRef.current?.({
              ...params,
              index: currentList.length - 1
            })
          }
          return
        }

        const targetPage = Math.floor(target / limitRef.current) + 1
        const scrollToBottom = () => {
          const { list } = listRef.current
          if (!list.length) return

          scrollToIndexRef.current?.({
            ...params,
            index: list.length - 1
          })
        }

        // 先滚到底部, 让用户看到当前加载位置
        scrollToBottom()

        // 逐页加载, 每页加载后滚到新的底部继续
        while (listRef.current.pagination.page < targetPage) {
          if (id !== scrollToIndexId.current) return
          const page = listRef.current.pagination.page
          const loaded = await waitForNextPage()

          if (id !== scrollToIndexId.current || scrollToIndexCanceled.current) return
          if (!loaded && listRef.current.pagination.page <= page) break

          if (listRef.current.pagination.page < targetPage) scrollToBottom()
        }

        if (id !== scrollToIndexId.current || scrollToIndexCanceled.current) return

        // 目标页已加载, 跳转到目标楼层
        if (target < listRef.current.list.length) {
          scrollToIndexRef.current?.(params)
        } else {
          scrollToBottom()
        }
      },
      [waitForNextPage]
    )

    // opt-in 时通过代理对象覆盖 scrollToIndex, 关闭时透传原始 ref
    const handleForwardRef = useCallback(
      ref => {
        listViewRef.current = ref
        scrollToIndexRef.current = ref?.scrollToIndex

        const proxy = enableScrollToIndexLoadMore
          ? ref
            ? Object.assign(Object.create(ref), { scrollToIndex: handleScrollToIndex })
            : ref
          : ref
        setRef(forwardRef || connectRef, proxy)
      },
      [connectRef, enableScrollToIndexLoadMore, forwardRef, handleScrollToIndex]
    )

    // 用户手动拖拽时取消自动跳转, 但不打断当前页正在进行的加载
    const handleScrollBeginDrag = useCallback(
      event => {
        scrollToIndexCanceled.current = true
        if (typeof onScrollBeginDrag === 'function') onScrollBeginDrag(event)
      },
      [onScrollBeginDrag]
    )

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
        onPage(list, lastPage.current)
      }

      if (typeof onNextPage === 'function') {
        onNextPage(data.slice(limit, limit * 2))
      }
    }, [data, limit, onPage, onNextPage, setList])

    return (
      <Component id='base-pagination-list' data-version='2'>
        <ListView
          // opt-in 时使用代理 ref、接管触底和拖拽取消逻辑
          ref={enableScrollToIndexLoadMore ? handleForwardRef : forwardRef || connectRef}
          data={list}
          {...other}
          onScrollBeginDrag={enableScrollToIndexLoadMore ? handleScrollBeginDrag : onScrollBeginDrag}
          {...(enableScrollToIndexLoadMore ? { onEndReached: handleEndReached } : {})}
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
)

export default PaginationList2
