/*
 * @Author: czy0729
 * @Date: 2026-06-26 17:22:11
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-06-26 17:22:11
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { uiStore } from '@stores'
import { sleep } from '@utils'
import { REFRESH_STATE, SCROLL_CALLBACK, SCROLL_THRESHOLD } from './ds'

import type { FlatList } from 'react-native'
import type { AnyObject, ListEmpty, MaybeReadonly } from '@types'
import type {
  RefreshState,
  ScrollToEnd,
  ScrollToIndex,
  ScrollToItem,
  ScrollToLocation,
  ScrollToOffset
} from './types'

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

  /** 用 ref 持有最新回调，避免 useCallback 依赖 */
  const headerRef = useRef(rawOnHeaderRefresh)
  headerRef.current = rawOnHeaderRefresh
  const footerRef = useRef(rawOnFooterRefresh)
  footerRef.current = rawOnFooterRefresh
  const dataRef = useRef(data)
  dataRef.current = data

  /** 根据数据状态更新刷新状态 */
  const updateRefreshState = useCallback((listData: MaybeReadonly<ListEmpty<ItemT>>) => {
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
    setTimeout(() => {
      setRefreshState(prev => {
        if (prev !== REFRESH_STATE.Idle) {
          return REFRESH_STATE.Idle
        }
        return prev
      })
    }, 4000)

    await sleep(400)
    await headerRef.current()
    updateRefreshState(dataRef.current)
  }, [updateRefreshState])

  /** 上拉加载更多处理 */
  const onFooterRefresh = useCallback(async () => {
    if (typeof footerRef.current !== 'function') return

    setRefreshState(REFRESH_STATE.FooterRefreshing)

    await sleep(640)
    footerRef.current()
  }, [])

  /** 是否已触发加载更多（防重复触发） */
  const onEndReachedRef = useRef(false)

  /** 判断是否应该开始上拉加载 */
  const shouldStartFooterRefreshing = useCallback(() => {
    return refreshState === REFRESH_STATE.Idle
  }, [refreshState])

  /** 到达列表底部时触发 */
  const onEndReached = useCallback(() => {
    if (onEndReachedRef.current) return

    if (shouldStartFooterRefreshing()) {
      onEndReachedRef.current = true
      onFooterRefresh()
      setTimeout(() => {
        onEndReachedRef.current = false
      }, 1000)
    }
  }, [shouldStartFooterRefreshing, onFooterRefresh])

  /** 组件挂载后初始化刷新状态 */
  useEffect(() => {
    updateRefreshState(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** data 变化时同步刷新状态 */
  useEffect(() => {
    updateRefreshState(data)
  }, [data, updateRefreshState])

  return {
    refreshState,
    onHeaderRefresh,
    onFooterRefresh,
    onEndReached
  }
}

/**
 * 滚动保护 hook
 */
export function useScrollProtection() {
  const scrollStartYRef = useRef(0)
  const scrollLockedRef = useRef(false)
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onScrollBeginDrag = useCallback((e: any) => {
    scrollStartYRef.current = e?.nativeEvent?.contentOffset?.y ?? 0
    scrollLockedRef.current = false
  }, [])

  const onScroll = useCallback((e: any) => {
    if (!scrollLockedRef.current) {
      const currentY = e?.nativeEvent?.contentOffset?.y ?? 0
      if (Math.abs(currentY - scrollStartYRef.current) > SCROLL_THRESHOLD) {
        scrollLockedRef.current = true
        uiStore.setScrolling(true)
      }
    }
  }, [])

  const onScrollEndDrag = useCallback(() => {
    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current)
    scrollEndTimerRef.current = setTimeout(() => {
      scrollLockedRef.current = false
      uiStore.setScrolling(false)
    }, 100)
  }, [])

  const onMomentumScrollEnd = useCallback(() => {
    scrollLockedRef.current = false
    uiStore.setScrolling(false)
  }, [])

  /** 合并滚动回调，确保滑动保护始终生效 */
  const mergeScrollCallback = useCallback(
    <K extends keyof AnyObject>(
      passProps: AnyObject,
      key: K,
      internal: (...args: any[]) => void
    ) => {
      const user = passProps[key]
      if (typeof user === 'function') {
        passProps[key] = ((...args: any[]) => {
          internal(...args)
          ;(user as Function)(...args)
        }) as any
      } else if (user != null) {
        // Animated.event 返回的 AnimatedEvent 对象不能直接调用，
        // 只能保留原样由 FlatList 内部原生事件系统处理
        passProps[key] = user
      } else {
        passProps[key] = internal as any
      }
    },
    []
  )

  /** 组件卸载时清理定时器 */
  useEffect(() => {
    return () => {
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current)
    }
  }, [])

  return {
    onScrollBeginDrag,
    onScroll,
    onScrollEndDrag,
    onMomentumScrollEnd,
    mergeScrollCallback
  }
}

/**
 * 滚动方法 hook
 */
export function useScrollMethods() {
  const scrollToIndexRef = useRef<ScrollToIndex>(SCROLL_CALLBACK)
  const scrollToOffsetRef = useRef<ScrollToOffset>(SCROLL_CALLBACK)
  const scrollToItemRef = useRef<ScrollToItem>(SCROLL_CALLBACK)
  const scrollToEndRef = useRef<ScrollToEnd>(SCROLL_CALLBACK)
  const scrollToLocationRef = useRef<ScrollToLocation>(SCROLL_CALLBACK)

  /** 连接列表引用，绑定滚动方法 */
  const connectRef = useCallback((ref: React.RefObject<FlatList>['current']) => {
    if (ref?.scrollToIndex) {
      scrollToIndexRef.current = params => {
        ref.scrollToIndex(params)
      }
    }

    if (ref?.scrollToOffset) {
      scrollToOffsetRef.current = params => {
        ref.scrollToOffset(params)
      }
    } else if (
      // @ts-expect-error
      ref?._wrapperListRef?._listRef?.scrollToOffset
    ) {
      scrollToOffsetRef.current = params => {
        // @ts-expect-error
        ref._wrapperListRef._listRef.scrollToOffset(params)
      }
    }

    if (ref?.scrollToItem) {
      scrollToItemRef.current = params => {
        ref.scrollToItem(params)
      }
    }

    if (ref?.scrollToEnd) {
      scrollToEndRef.current = params => {
        ref.scrollToEnd(params)
      }
    } else if (
      // @ts-expect-error
      ref?._wrapperListRef?._listRef?.scrollToEnd
    ) {
      scrollToEndRef.current = params => {
        // @ts-expect-error
        ref._wrapperListRef._listRef.scrollToEnd(params)
      }
    }

    // @ts-expect-error
    if (ref?.scrollToLocation) {
      scrollToLocationRef.current = params => {
        // @ts-expect-error
        ref.scrollToLocation(params)
      }
    }
  }, [])

  return {
    connectRef
  }
}

/**
 * 列表数据计算 hook
 * 只接收具体字段，不依赖整个 props 引用
 */
export function useListData<ItemT>({
  data,
  sectionKey,
  sections: rawSections
}: {
  data: MaybeReadonly<ListEmpty<ItemT>>
  sectionKey?: string
  sections?: any[]
}) {
  /** 计算分组数据（SectionList 模式） */
  const sections = useMemo(() => {
    let computedSections = []
    if (rawSections) {
      computedSections = rawSections.slice()
    } else {
      const sectionsMap = {}
      data.list.forEach(item => {
        const title = item[sectionKey]
        if (sectionsMap[title] === undefined) {
          sectionsMap[title] = computedSections.length
          computedSections.push({
            title,
            data: [item]
          })
        } else {
          computedSections[sectionsMap[title]].data.push(item)
        }
      })
    }
    return computedSections
  }, [data, sectionKey, rawSections])

  /** 获取列表数据 */
  const list = useMemo(() => {
    return data.list
  }, [data.list])

  return {
    sections,
    list
  }
}
