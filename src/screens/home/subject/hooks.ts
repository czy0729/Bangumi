/*
 * @Author: czy0729
 * @Date: 2023-12-15 16:13:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-08 12:40:51
 */
import { useCallback, useRef } from 'react'
import { findNodeHandle } from 'react-native'
import { _ } from '@stores'
import { feedback, postTask } from '@utils'
import { scrollToTop } from '@utils/dom'
import { t } from '@utils/fetch'
import { useFocusEffect, useIsFocusedRef, useMount, useRunAfter } from '@utils/hooks'
import { IOS, WEB } from '@constants'
import { TITLE_HEAD } from './ds'
import { Ctx } from './types'

/** 条目页面逻辑 */
export function useSubjectPage({ $ }: Ctx) {
  /** 页面是否聚焦 */
  const isFocused = useIsFocusedRef()

  /** 初始化状态管理器 */
  useRunAfter(async () => {
    postTask(() => {
      if (isFocused.current) $.setRendered()
    }, 480)

    await $.init()

    t('条目.查看', {
      subjectId: $.subjectId,
      type: $.type
    })
  })

  /** 动态改变状态栏主题 */
  useFocusEffect(() => {
    $.updateStatusBar()
  })

  /** 页面销毁 */
  useMount(() => {
    return () => {
      $.setState({
        mounted: false
      })

      postTask(() => {
        $.setState({
          fixed: false
        })
        $.unRendered()
      }, 400)
    }
  })

  /** ListView.ref */
  const scrollViewRef = useRef<any>(null)

  /** 子组件的 ref */
  const blockRefs = useRef<any>({})

  return {
    /** 收集 ListView.ref */
    forwardRef: useCallback((ref: any) => {
      scrollViewRef.current = ref
    }, []),

    /** 收集子组件的 ref */
    onBlockRef: useCallback((ref: any, component: string) => {
      postTask(() => {
        blockRefs.current[component] = ref
      }, 1000)
    }, []),

    /** 子组件可以调用此方法定位到指定 y 轴坐标 */
    onScrollIntoViewIfNeeded: useCallback(
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    ),

    /** 子组件可以调用此方法定位到指定子组件块 */
    onScrollTo: useCallback(
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    )
  }
}
