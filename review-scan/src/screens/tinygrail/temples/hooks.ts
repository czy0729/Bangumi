/*
 * @Author: czy0729
 * @Date: 2024-11-19 18:59:27
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-19 18:59:27
 */
import { useInitStore } from '@stores'
import { useMount } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 通天塔页面逻辑 */
export function useTinygrailTemplesPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useMount(() => {
    $.onHeaderRefresh()
  })

  return context
}
