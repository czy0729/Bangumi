/*
 * @Author: czy0729
 * @Date: 2024-01-10 04:40:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 10:00:18
 */
import { useCallback, useEffect } from 'react'
import { useOnScroll } from '@components/header/utils'
import { useInitStore } from '@stores'
import { useRunAfter, useViewport } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 人物页面逻辑 */
export function useMonoPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  const { visibleBottom, onScroll: onUseViewport } = useViewport()
  useEffect(() => {
    $.setState({
      visibleBottom
    })
  }, [$, visibleBottom])

  const { fixed, onScroll: onUseOnScroll } = useOnScroll()
  const onScroll = useCallback(
    evt => {
      onUseViewport(evt)
      onUseOnScroll(evt)
    },
    [onUseOnScroll, onUseViewport]
  )

  return {
    ...context,
    fixed,
    onScroll
  }
}
