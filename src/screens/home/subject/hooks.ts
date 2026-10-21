/*
 * @Author: czy0729
 * @Date: 2023-12-15 16:13:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-21 10:00:00
 *
 * 条目页面初始化与滚动定位逻辑
 */
import { useCallback, useEffect, useRef } from 'react'
import { findNodeHandle } from 'react-native'
import { useInitStore } from '@stores'
import { feedback, info } from '@utils'
import { scrollToTop } from '@utils/dom'
import { t } from '@utils/fetch'
import { usePageLifecycle } from '@utils/hooks'
import { IOS, WEB } from '@constants'
import { HEADER_HEIGHT } from '@styles'
import store from './store'
import { TITLE_HEAD } from './ds'

import type { RefObject } from 'react'
import type { View } from 'react-native'
import type { NavigationProps, TimerRef } from '@types'
import type { ListViewScrollMethods } from '@components'
import type {
  Ctx,
  HandleBlockRef,
  HandleForwardRef,
  HandleScrollIntoViewIfNeeded,
  HandleScrollTo,
  HandleScrollToTop
} from './types'

/** 条目页面逻辑 */
export function useSubjectPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  const { scrollViewRef, blockRefs, scrollTimers, handleForwardRef, handleBlockRef } =
    useSubjectRefs()

  const { handleScrollIntoViewIfNeeded, handleScrollTo, handleScrollToTop } = useSubjectScroll(
    $,
    scrollViewRef,
    blockRefs,
    scrollTimers
  )

  usePageLifecycle(
    {
      onFocus() {
        $.updateStatusBar()
      },
      async onEnterComplete() {
        await $.init()

        t('条目.查看', {
          subjectId: $.subjectId,
          type: $.type
        })
      },
      onLeaveComplete() {
        $.unmount()
      }
    },
    id
  )

  return {
    /** 页面上下文 (id / $ / navigation) */
    ...context,

    /** 收集长列表 ref */
    handleForwardRef,

    /** 收集区块锚点 ref */
    handleBlockRef,

    /** 滚动到指定 y 轴坐标 */
    handleScrollIntoViewIfNeeded,

    /** 滚动到指定区块 */
    handleScrollTo,

    /** 滚动到顶 */
    handleScrollToTop
  }
}

/** 管理所有 ref 收集和卸载清理 */
function useSubjectRefs() {
  /** ListView.ref */
  const scrollViewRef = useRef<ListViewScrollMethods>(null)

  /** 子组件的 ref */
  const blockRefs = useRef<Record<string, View>>({})

  /** 延迟滚动的 timeout id，用于卸载时清理 */
  const scrollTimers = useRef<TimerRef[]>([])

  // 卸载时清理所有未执行的 timeout
  useEffect(() => {
    return () => {
      scrollTimers.current.forEach(id => clearTimeout(id))
      scrollTimers.current = []
    }
  }, [])

  /** 收集长列表的 ref */
  const handleForwardRef = useCallback<HandleForwardRef>(ref => {
    scrollViewRef.current = ref
  }, [])

  /** 收集子组件的 ref, 区块卸载时同步移除 */
  const handleBlockRef = useCallback<HandleBlockRef>((ref, componentName) => {
    if (ref) {
      blockRefs.current[componentName] = ref
    } else {
      delete blockRefs.current[componentName]
    }
  }, [])

  return {
    /** 长列表 ref */
    scrollViewRef,

    /** 区块锚点 ref 集合 */
    blockRefs,

    /** 延迟滚动定时器集合 */
    scrollTimers,

    /** 收集长列表 ref */
    handleForwardRef,

    /** 收集区块锚点 ref */
    handleBlockRef
  }
}

/**
 * 所有滚动相关逻辑
 *
 * @param $ 条目页面 store
 * @param scrollViewRef 长列表 ref
 * @param blockRefs 区块锚点 ref 集合
 * @param scrollTimers 延迟滚动定时器集合
 */
function useSubjectScroll(
  $: Ctx['$'],
  scrollViewRef: RefObject<ListViewScrollMethods>,
  blockRefs: RefObject<Record<string, View>>,
  scrollTimers: RefObject<TimerRef[]>
) {
  /** 子组件可以调用此方法定位到指定 y 轴坐标 */
  const handleScrollIntoViewIfNeeded = useCallback<HandleScrollIntoViewIfNeeded>(
    y => {
      try {
        if (typeof scrollViewRef?.current?.scrollToOffset === 'function') {
          scrollViewRef.current.scrollToOffset({
            animated: true,
            offset: y + $.onScrollY
          })
        }
      } catch {}
    },
    [$, scrollViewRef]
  )

  /** 实际执行滚动到目标子组件块 */
  const doScrollTo = useCallback(
    (name: string, component: string) => {
      const callback = () => {
        feedback(true)
        t('条目.跳转位置', {
          subjectId: $.subjectId,
          component
        })
      }

      // ref 已注册不代表完成布局, 取不到锚点或长列表时直接放弃, 避免 measure 到未布局的值
      const head = blockRefs.current[TITLE_HEAD]
      const target = blockRefs.current[name]
      if (!head || !target || !scrollViewRef.current) return

      if (IOS) {
        head.measure((_x: number, _y: number, _w: number, h: number) => {
          target.measure((_x: number, y: number) => {
            scrollViewRef.current.scrollToOffset({
              offset: y + h - HEADER_HEIGHT,
              animated: true
            })
            callback()
          })
        })
        return
      }

      if (WEB) {
        target.measureLayout(head, (_x: number, y: number) => {
          scrollToTop(y + 128)
          callback()
        })
        return
      }

      target.measureLayout(
        findNodeHandle(scrollViewRef.current.getInnerRef()),
        (_x: number, y: number) => {
          scrollViewRef.current.scrollToOffset({
            offset: y - HEADER_HEIGHT,
            animated: true
          })
          callback()
        }
      )
    },
    [$, blockRefs, scrollViewRef]
  )

  /** 子组件可以调用此方法定位到指定子组件块 */
  const handleScrollTo = useCallback<HandleScrollTo>(
    (component: string) => {
      try {
        // 单行本 (10) => 单行本
        const name = component.split('(')[0].trim()
        if (!scrollViewRef.current) return

        if (blockRefs.current[name]) {
          doScrollTo(name, component)
          return
        }

        // ref 不存在，可能板块还没渲染（BottomEls 需要 scrolled=true）
        // 强制渲染后等 ref 注册完成再滚动
        info('加载板块中，马上跳转...')
        if (!$.state.scrolled) {
          $.setState({ scrolled: true })
        }

        let retried = false
        const tryScroll = () => {
          if (blockRefs.current[name]) {
            doScrollTo(name, component)
          } else if (!retried) {
            retried = true
            scrollTimers.current.push(setTimeout(tryScroll, 1500))
          }
        }
        scrollTimers.current.push(setTimeout(tryScroll, 800))
      } catch {}
    },
    [$, doScrollTo, blockRefs, scrollTimers, scrollViewRef]
  )

  /** 滚动到顶 */
  const handleScrollToTop = useCallback<HandleScrollToTop>(() => {
    if (!scrollViewRef.current) return

    feedback()
    scrollViewRef.current.scrollToOffset({
      offset: 0,
      animated: true
    })
  }, [scrollViewRef])

  return {
    /** 滚动到指定 y 轴坐标 */
    handleScrollIntoViewIfNeeded,

    /** 滚动到指定区块 */
    handleScrollTo,

    /** 滚动到顶 */
    handleScrollToTop
  }
}
