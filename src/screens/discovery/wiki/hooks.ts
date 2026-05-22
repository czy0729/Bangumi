/*
 * @Author: czy0729
 * @Date: 2024-11-17 08:13:45
 * @Last Modified by: imagebuilder1837
 * @Last Modified time: 2026-05-22 08:15:05
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import type { NavigationProps } from '@types'
import store from './store'
import type { Ctx } from './types'

/** 维基人页面逻辑 */
export function useWikiPage(props: NavigationProps) {
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

  return context
}
