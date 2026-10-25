/*
 * @Author: czy0729
 * @Date: 2026-10-25 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-25 00:00:00
 *
 * 列表滚动: 翻页后回到头部底部
 */
import { useCallback, useEffect, useRef } from 'react'
import { useInsets } from '@utils/hooks'
import { WEB } from '@constants'

import type { ListViewScrollMethods } from '@components'
import type { LayoutChangeEvent } from 'react-native'
import type { ScrollEvent } from '@types'

type Options = {
  /** 当前页码 */
  page: number

  /** 当前页数据是否已就绪 */
  loaded: boolean

  /** 列表长度, 用于忽略数据清空时的 offset 变化 */
  listLength: number

  /** 列表滚动回调 */
  onScroll: (e: ScrollEvent) => void
}

/**
 * 翻页后滚动到头部底部, 即第一项顶部
 * - 未滚过头部底部时保持原位
 * - web 列表没有暴露滚动方法, 直接跳过
 */
export function useScrollToHeader({ page, loaded, listLength, onScroll }: Options) {
  const { headerHeight: headerInset } = useInsets()

  const listRef = useRef<ListViewScrollMethods | null>(null)

  /** 头部高度 */
  const headerHeightRef = useRef(0)

  /** 当前滚动位置 */
  const offsetYRef = useRef(0)

  /** 翻页瞬间的滚动位置, 数据清空后实时 offset 会被钳制, 不能用它判断 */
  const pageOffsetRef = useRef(0)

  /** 待执行的目标偏移, 等 contentSize 更新后再滚动 */
  const pendingOffsetRef = useRef<number | null>(null)

  /** 上一次渲染的页码, 用于识别翻页 */
  const lastPageRef = useRef(page)

  /** 等待滚动的页码 */
  const targetPageRef = useRef<number | null>(null)

  const handleRef = useCallback((ref: unknown) => {
    listRef.current = ref as ListViewScrollMethods | null
  }, [])

  const handleHeaderLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    headerHeightRef.current = nativeEvent.layout.height
  }, [])

  const handleScroll = useCallback(
    (e: ScrollEvent) => {
      // 数据清空时 offset 会被钳制到 0, 既不能当作滚动位置, 也不回传页面
      if (!listLength) return

      offsetYRef.current = e.nativeEvent.contentOffset.y
      onScroll(e)
    },
    [listLength, onScroll]
  )

  /** contentSize 更新后再滚动, 避免按旧内容高度被 clamp */
  const handleContentSizeChange = useCallback(() => {
    if (pendingOffsetRef.current === null) return

    const offset = pendingOffsetRef.current
    pendingOffsetRef.current = null
    listRef.current?.scrollToOffset?.({
      offset,
      animated: false
    })
  }, [])

  useEffect(() => {
    if (lastPageRef.current !== page) {
      lastPageRef.current = page
      targetPageRef.current = page
      pageOffsetRef.current = offsetYRef.current
    }

    if (WEB) return
    if (targetPageRef.current !== page || !loaded) return

    targetPageRef.current = null
    const offset = Math.max(0, headerHeightRef.current - headerInset)

    // 翻页前还没滚过头部底部, 保持当前滚动位置
    if (pageOffsetRef.current <= offset) return

    pendingOffsetRef.current = offset

    /**
     * contentSize 回调可能晚于下一帧, 先滚一次; 是否清空交由 onContentSizeChange 决定,
     * 否则会按旧内容高度滚完就丢掉这次滚动
     */
    const raf = requestAnimationFrame(() => {
      if (pendingOffsetRef.current === null) return

      listRef.current?.scrollToOffset?.({
        offset: pendingOffsetRef.current,
        animated: false
      })
    })

    /** 内容高度未再变化时的兜底清理 */
    const timer = setTimeout(() => {
      pendingOffsetRef.current = null
    }, 300)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      pendingOffsetRef.current = null
    }
  }, [page, loaded, headerInset])

  return {
    handleRef,
    handleHeaderLayout,
    handleScroll,
    handleContentSizeChange
  }
}
