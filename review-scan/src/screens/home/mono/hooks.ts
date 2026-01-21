/*
 * @Author: czy0729
 * @Date: 2024-01-10 04:40:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 10:00:18
 */
import { useCallback, useEffect } from 'react'
import { useOnScroll } from '@components/header/utils'
import { useInitStore } from '@stores'
import { usePageLifecycle, useViewport } from '@utils/hooks'
import { NavigationProps, ScrollEvent } from '@types'
import store from './store'
import { Ctx } from './types'

/** 人物页面逻辑 */
export function useMonoPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  const { visibleBottom, onScroll: onUseViewport } = useViewport()
  useEffect(() => {
    $.setState({
      visibleBottom
    })
  }, [$, visibleBottom])

  const { fixed, onScroll } = useOnScroll()
  const handleScroll = useCallback(
    (evt: ScrollEvent) => {
      onUseViewport(evt)
      onScroll(evt)
    },
    [onScroll, onUseViewport]
  )

  usePageLifecycle(
    {
      onEnterComplete() {
        $.init()
      },
      onLeaveComplete() {
        $.unmount()
      }
    },
    id
  )

  return {
    ...context,
    fixed,
    handleScroll
  }
}
