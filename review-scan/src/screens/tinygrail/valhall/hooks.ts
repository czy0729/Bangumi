/*
 * @Author: czy0729
 * @Date: 2024-11-20 09:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 11:34:25
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 英灵殿页面逻辑 */
export function useTinygrailValhallPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}
