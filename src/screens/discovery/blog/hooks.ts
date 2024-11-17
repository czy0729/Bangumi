/*
 * @Author: czy0729
 * @Date: 2024-11-17 09:32:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 09:32:47
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 全站日志页面逻辑 */
export function useDiscoveryBlogPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}
