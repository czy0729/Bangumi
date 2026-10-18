/*
 * @Author: czy0729
 * @Date: 2024-11-17 08:13:45
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-17 08:13:45
 *
 * 维基人页面逻辑
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
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
