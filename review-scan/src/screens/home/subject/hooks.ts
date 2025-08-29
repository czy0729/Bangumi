/*
 * @Author: czy0729
 * @Date: 2023-12-15 16:13:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 07:01:15
 */
import { useCallback, useRef } from 'react'
import { findNodeHandle, FlatList, View } from 'react-native'
import { _, useInitStore } from '@stores'
import { feedback, postTask } from '@utils'
import { scrollToTop } from '@utils/dom'
import { t } from '@utils/fetch'
import { usePageLifecycle } from '@utils/hooks'
import { IOS, WEB } from '@constants'
import { NavigationProps } from '@types'
import store from './store'
import { TITLE_HEAD } from './ds'
import { Ctx } from './types'

/** 条目页面逻辑 */
export function useSubjectPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  /** ListView.ref */
  const scrollViewRef = useRef<FlatList>(null)

  /** 子组件的 ref */
  const blockRefs = useRef<Record<string, View>>({})

  /** 收集长列表的 ref */
  const handleForwardRef = useCallback((ref: FlatList) => {
    scrollViewRef.current = ref
  }, [])

  /** 收集子组件的 ref */
  const handleBlockRef = useCallback((ref: View, componentName: string) => {
    postTask(() => {
      blockRefs.current[componentName] = ref
    }, 1000)
  }, [])

  /** 子组件可以调用此方法定位到指定 y 轴坐标 */
  const handleScrollIntoViewIfNeeded = useCallback(
    (y: number) => {
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
  const handleScrollTo = useCallback(
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
                    offset: y + h - _.headerHeight,
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
                offset: y - _.headerHeight,
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
  const handleScrollToTop = useCallback(() => {
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
