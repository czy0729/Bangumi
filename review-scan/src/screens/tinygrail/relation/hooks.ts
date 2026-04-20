/*
 * @Author: czy0729
 * @Date: 2024-11-19 15:44:58
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-19 15:44:58
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 关联角色页面逻辑 */
export function useTinygrailRelationPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}
