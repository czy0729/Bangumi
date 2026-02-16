/*
 * @Author: czy0729
 * @Date: 2024-11-19 13:26:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 13:29:27
 */
import { useInitStore } from '@stores'
import { useMount, useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 我的道具页面逻辑 */
export function useTinygrailItemsPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  useMount(() => {
    return () => {
      try {
        $.onCloseModal()
      } catch (error) {}
    }
  })

  return context
}
