/*
 * @Author: czy0729
 * @Date: 2023-12-15 16:13:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 01:15:34
 */
import { useCallback, useRef } from 'react'
import { findNodeHandle } from 'react-native'
import { StatusBar } from '@components'
import { _ } from '@stores'
import { feedback } from '@utils'
import { scrollToTop } from '@utils/dom'
import { t } from '@utils/fetch'
import { useFocusEffect, useIsFocusedRef, useMount, useRunAfter } from '@utils/hooks'
import { IOS, STORYBOOK } from '@constants'
import { TITLE_HEAD } from './ds'
import { Ctx } from './types'

/** 条目页面逻辑 */
export function useSubjectPage({ $ }: Ctx) {
  /** 页面是否聚焦 */
  const isFocused = useIsFocusedRef()

  /** 初始化状态管理器 */
  useRunAfter(async () => {
    setTimeout(() => {
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
    setTimeout(() => {
      StatusBar.setBarStyle(
        _.isDark ? 'light-content' : $.state.fixed ? 'dark-content' : 'light-content'
      )
    }, 80)
  })

  /** 页面销毁 */
  useMount(() => {
    return () => {
      setTimeout(() => {
        $.unRendered()
        $.setState({
          fixed: false
        })
      }, 480)
    }
  })

  /** ListView.ref */
  const scrollViewRef = useRef<any>(null)

  /** 子组件的 ref */
  const blockRefs = useRef<any>({})

  return {
    /** 收集 ListView.ref */
    forwardRef: useCallback(ref => {
      scrollViewRef.current = ref
    }, []),

    /** 收集子组件的 ref */
    onBlockRef: useCallback((ref, component: string) => {
      blockRefs.current[component] = ref
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
            if (IOS || STORYBOOK) {
              blockRefs.current[TITLE_HEAD].measure(
                (x: number, y: number, w: number, h: number) => {
                  blockRefs.current[name].measure((x: number, y: number) => {
                    if (STORYBOOK) {
                      scrollToTop(y + h + 116)
                    } else {
                      scrollViewRef.current.scrollToOffset({
                        offset: y + h - _.headerHeight,
                        animated: true
                      })
                    }
                    feedback()

                    t('条目.跳转位置', {
                      subjectId: $.subjectId,
                      component
                    })
                  })
                }
              )
              return
            }

            blockRefs.current[name].measureLayout(
              findNodeHandle(scrollViewRef.current),
              (x: number, y: number) => {
                scrollViewRef.current.scrollToOffset({
                  offset: y - _.headerHeight,
                  animated: true
                })
                feedback()

                t('条目.跳转位置', {
                  subjectId: $.subjectId,
                  component
                })
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
