/*
 * @Author: czy0729
 * @Date: 2024-11-19 07:30:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:24:44
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 献祭推荐页面逻辑 */
export function useTinygrailAdvanceSacrificePage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}
