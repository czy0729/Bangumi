/*
 * @Author: czy0729
 * @Date: 2025-07-17 13:09:32
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-07-17 13:09:32
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 刮刮乐日榜页面逻辑 */
export function useTinygrailLotteryRankPage(props: NavigationProps) {
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
