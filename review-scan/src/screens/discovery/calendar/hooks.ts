/*
 * @Author: czy0729
 * @Date: 2024-11-17 01:09:23
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-17 01:09:23
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 每日放送页面逻辑 */
export function useCalendarPage(props: NavigationProps) {
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

  return context
}
