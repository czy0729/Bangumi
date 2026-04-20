/*
 * @Author: czy0729
 * @Date: 2024-06-21 05:29:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 12:07:02
 */
import { useOnScroll } from '@components/header/utils'
import { useInitStore } from '@stores'
import { useKeyboardAdjustResize, usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 日志页面逻辑 */
export function useBlogPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  const { fixed, onScroll } = useOnScroll()
  useKeyboardAdjustResize()
  usePageLifecycle(
    {
      onEnterComplete() {
        $.init()
      }
    },
    id
  )

  return {
    ...context,
    fixed,
    handleScroll: onScroll
  }
}
