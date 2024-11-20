/*
 * @Author: czy0729
 * @Date: 2024-03-11 17:05:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 15:57:21
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 番市首富页面逻辑 */
export function useTinygrailRichPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}
