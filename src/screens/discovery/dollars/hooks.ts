/*
 * @Author: czy0729
 * @Date: 2024-04-06 12:30:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:34:22
 */
import { useRef } from 'react'
import { useInitStore } from '@stores'
import { useMount, usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** Dollars 页面逻辑 */
export function useDollarsPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

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

  const interval = useRef(null)
  useMount(() => {
    interval.current = setInterval(() => {
      $.updateDollars()
    }, 8000)

    return () => {
      $.scrollViewRef = null
      $.inputRef = null
      clearInterval(interval.current)
    }
  })

  return context
}
