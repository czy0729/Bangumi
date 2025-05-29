/*
 * @Author: czy0729
 * @Date: 2024-11-17 12:30:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 12:39:08
 */
import { useOnScroll } from '@components/header/utils'
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 小组页面逻辑 */
export function useGroupPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  const { fixed, onScroll } = useOnScroll()
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
