/*
 * @Author: czy0729
 * @Date: 2023-12-15 16:13:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 05:21:53
 */
import { useCallback, useRef } from 'react'
import { findNodeHandle } from 'react-native'
import { useInitStore } from '@stores'
import { feedback, postTask } from '@utils'
import { scrollToTop } from '@utils/dom'
import { t } from '@utils/fetch'
import { usePageLifecycle } from '@utils/hooks'
import { IOS, WEB } from '@constants'
import { HEADER_HEIGHT } from '@styles'
import store from './store'
import { TITLE_HEAD } from './ds'

import type { FlatList, View } from 'react-native'
import type { NavigationProps } from '@types'
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

  /** ListView.ref */
  const scrollViewRef = useRef<FlatList>(null)

  /** 子组件的 ref */
  const blockRefs = useRef<Record<string, View>>({})

  /** 收集长列表的 ref */
  const handleForwardRef = useCallback<HandleForwardRef>(ref => {
    scrollViewRef.current = ref
  }, [])

  /** 收集子组件的 ref */
  const handleBlockRef = useCallback<HandleBlockRef>((ref, componentName) => {
    postTask(() => {
      blockRefs.current[componentName] = ref
    }, 1000)
  }, [])

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
      } catch (error) {}
    },
    [$]
  )

  /** 子组件可以调用此方法定位到指定子组件块 */
  const handleScrollTo = useCallback<HandleScrollTo>(
    (component: string) => {
      try {
        // 单行本 (10) => 单行本
        const name = component.split('(')[0].trim()
        if (scrollViewRef.current && blockRefs.current[name]) {
          const callback = () => {
            feedback(true)
            t('条目.跳转位置', {
              subjectId: $.subjectId,
              component
            })
          }

          if (IOS) {
            blockRefs.current[TITLE_HEAD].measure(
              (_x: number, _y: number, _w: number, h: number) => {
                blockRefs.current[name].measure((_x: number, y: number) => {
                  scrollViewRef.current.scrollToOffset({
                    offset: y + h - HEADER_HEIGHT,
                    animated: true
                  })
                  callback()
                })
              }
            )
            return
          }

          if (WEB) {
            blockRefs.current[name].measureLayout(
              blockRefs.current[TITLE_HEAD],
              (_x: number, y: number) => {
                scrollToTop(y + 128)
                callback()
              }
            )
            return
          }

          blockRefs.current[name].measureLayout(
            findNodeHandle(scrollViewRef.current),
            (_x: number, y: number) => {
              scrollViewRef.current.scrollToOffset({
                offset: y - HEADER_HEIGHT,
                animated: true
              })
              callback()
            }
          )
        }
      } catch (error) {}
    },
    [$.subjectId]
  )

  /** 滚动到顶 */
  const handleScrollToTop = useCallback<HandleScrollToTop>(() => {
    feedback()
    scrollViewRef.current.scrollToOffset({
      offset: 0,
      animated: true
    })
  }, [])

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
    ...context,
    handleForwardRef,
    handleBlockRef,
    handleScrollIntoViewIfNeeded,
    handleScrollTo,
    handleScrollToTop
  }
}
