/*
 * @Author: czy0729
 * @Date: 2026-06-29 07:08:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-05 04:27:05
 */
import { useCallback, useImperativeHandle, useRef } from 'react'
import { SCROLL_CALLBACK } from '../ds'

import type { FlatListRef, ListViewScrollMethods } from '../types'

/**
 * 滚动方法 hook
 */
export function useScrollMethods(ref?: React.Ref<ListViewScrollMethods>) {
  const methodsRef = useRef<ListViewScrollMethods>({
    scrollToIndex: SCROLL_CALLBACK,
    scrollToOffset: SCROLL_CALLBACK,
    scrollToItem: SCROLL_CALLBACK,
    scrollToEnd: SCROLL_CALLBACK,
    scrollToLocation: SCROLL_CALLBACK
  })

  /** 保存原始的 FlatList ref，用于安卓端 measureLayout */
  const rawListRef = useRef<FlatListRef>(null)

  /** 连接列表引用，动态绑定滚动方法 */
  const connectRef = useCallback((listRef: FlatListRef) => {
    if (!listRef) return

    // 保存原始 ref
    rawListRef.current = listRef

    const methods = methodsRef.current
    const nestedRef = listRef._wrapperListRef?._listRef

    // 批量映射方法名与其优先级的获取逻辑
    const keys: Exclude<keyof ListViewScrollMethods, 'getInnerRef'>[] = [
      'scrollToIndex',
      'scrollToOffset',
      'scrollToItem',
      'scrollToEnd',
      'scrollToLocation'
    ]

    keys.forEach(key => {
      const targetFn = listRef[key] ?? nestedRef?.[key]
      if (typeof targetFn === 'function') {
        methods[key] = (params: any) => targetFn.call(listRef[key] ? listRef : nestedRef, params)
      }
    })
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      scrollToIndex: (...args) => methodsRef.current.scrollToIndex(...args),
      scrollToOffset: (...args) => methodsRef.current.scrollToOffset(...args),
      scrollToItem: (...args) => methodsRef.current.scrollToItem(...args),
      scrollToEnd: (...args) => methodsRef.current.scrollToEnd(...args),
      scrollToLocation: (...args) => methodsRef.current.scrollToLocation(...args),
      /** 获取原始的 FlatList ref，用于安卓端 measureLayout */
      getInnerRef: () => rawListRef.current
    }),
    []
  )

  return { connectRef }
}
