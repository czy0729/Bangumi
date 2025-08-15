/*
 * @Author: czy0729
 * @Date: 2024-11-17 07:50:15
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-17 07:50:15
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** AI 推荐页面逻辑 */
export function useRecommendPage(props: NavigationProps) {
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
