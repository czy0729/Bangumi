/*
 * @Author: czy0729
 * @Date: 2024-11-16 10:13:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:31:07
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 用户人物页面逻辑 */
export function useCharacterPage(props: NavigationProps) {
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
