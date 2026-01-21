/*
 * @Author: czy0729
 * @Date: 2024-11-17 11:39:13
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-17 11:39:13
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 修订历史页面逻辑 */
export function useSubjectWikiPage(props: NavigationProps) {
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
