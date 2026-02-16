/*
 * @Author: czy0729
 * @Date: 2024-11-19 15:29:17
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-19 15:29:17
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 新番榜单页面逻辑 */
export function useTinygrailNewPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}
