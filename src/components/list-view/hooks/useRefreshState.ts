/*
 * @Author: czy0729
 * @Date: 2026-06-29 07:08:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-29 07:08:58
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { sleep } from '@utils'
import { REFRESH_STATE } from '../ds'

import type { MaybeReadonly, ListEmpty } from '@types'
import type { RefreshState } from '../types'

/**
 * 刷新状态管理 hook
 * 只接收具体字段，不依赖整个 props 引用
 */
export function useRefreshState<ItemT>({
  data,
  onHeaderRefresh: rawOnHeaderRefresh,
  onFooterRefresh: rawOnFooterRefresh
}: {
  data: MaybeReadonly<ListEmpty<ItemT>>
  onHeaderRefresh?: () => Promise<void> | void
  onFooterRefresh?: () => void
}) {
  const [refreshState, setRefreshState] = useState<RefreshState>(REFRESH_STATE.Idle)

  /** 安全守卫：追踪组件是否依然挂载，防止异步回调引发内存泄漏或状态竞态 */
  const isMountedRef = useRef(true)

  /** 用 ref 持有最新回调，避免 useCallback 依赖 */
  const headerRef = useRef(rawOnHeaderRefresh)
  headerRef.current = rawOnHeaderRefresh
  const footerRef = useRef(rawOnFooterRefresh)
  footerRef.current = rawOnFooterRefresh
  const dataRef = useRef(data)
  dataRef.current = data

  /** 根据数据状态更新刷新状态 */
  const updateRefreshState = useCallback((listData: MaybeReadonly<ListEmpty<ItemT>>) => {
    if (!isMountedRef.current) return

    const { list = [], pagination = { page: 0, pageTotal: 0 }, _loaded } = listData
    let newState: RefreshState

    if (!_loaded) {
      newState = REFRESH_STATE.Idle
    } else if (!list.length) {
      newState = REFRESH_STATE.EmptyData
    } else if (pagination.page < pagination.pageTotal) {
      newState = REFRESH_STATE.Idle
    } else {
      newState = REFRESH_STATE.NoMoreData
    }

    setRefreshState(newState)
  }, [])

  /** 下拉刷新处理 */
  const onHeaderRefresh = useCallback(async () => {
    if (!headerRef.current) return

    setRefreshState(REFRESH_STATE.HeaderRefreshing)

    // 4 秒没有返回也强制消除加载中的提示
    const timer = setTimeout(() => {
      if (!isMountedRef.current) return
      setRefreshState(prev => {
        // 核心修复：只有当状态依然处于"下拉刷新中"时，才进行兜底释放
        // 避免在 4s 内数据已经请求成功并切换为 EmptyData/NoMoreData 后被误篡改回 Idle
        if (prev === REFRESH_STATE.HeaderRefreshing) {
          return REFRESH_STATE.Idle
        }
        return prev
      })
    }, 4000)

    await sleep(400)
    await headerRef.current()

    clearTimeout(timer) // 成功返回后，安全清除定时器

    if (isMountedRef.current) {
      updateRefreshState(dataRef.current)
    }
  }, [updateRefreshState])

  /** 上拉加载更多处理 */
  const onFooterRefresh = useCallback(async () => {
    if (typeof footerRef.current !== 'function') return

    setRefreshState(REFRESH_STATE.FooterRefreshing)

    await sleep(640)
    footerRef.current()
  }, [])

  /** 是否已触发加载更多（防重复触发锁） */
  const onEndReachedRef = useRef(false)

  /** 判断是否应该开始上拉加载 */
  const shouldStartFooterRefreshing = useCallback(() => {
    return refreshState === REFRESH_STATE.Idle
  }, [refreshState])

  /** 到达列表底部时触发 */
  const onEndReached = useCallback(() => {
    // 如果已经上拉锁定，或者当前不是 Idle 状态（例如已经处于 HeaderRefreshing 或 FooterRefreshing），则拒绝触发
    if (onEndReachedRef.current || !shouldStartFooterRefreshing()) return

    onEndReachedRef.current = true
    onFooterRefresh()
  }, [shouldStartFooterRefreshing, onFooterRefresh])

  /** 关键生命周期管理 */
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  /** 仅在 data 发生变化或初始化时同步状态 */
  useEffect(() => {
    // 每次 data 变更，说明上一次的加载或刷新已经完成，解除上拉防重复锁定
    onEndReachedRef.current = false
    updateRefreshState(data)
  }, [data, updateRefreshState])

  return {
    refreshState,
    onHeaderRefresh,
    onFooterRefresh,
    onEndReached
  }
}
