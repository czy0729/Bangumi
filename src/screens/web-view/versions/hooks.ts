/*
 * @Author: czy0729
 * @Date: 2024-11-19 05:34:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 05:44:49
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 更新内容页面逻辑 */
export function useVersionsPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}
