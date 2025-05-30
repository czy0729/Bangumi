/*
 * @Author: czy0729
 * @Date: 2024-11-18 07:03:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:05:02
 */
import { useInitStore } from '@stores'
import { useKeyboardAdjustResize, usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 短信页面逻辑 */
export function usePMPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  usePageLifecycle(
    {
      onEnterComplete() {
        $.init()
      }
    },
    id
  )
  useKeyboardAdjustResize()

  return context
}
