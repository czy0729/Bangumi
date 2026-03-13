/*
 * @Author: czy0729
 * @Date: 2024-11-18 06:22:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:15:01
 */
import { useInitStore } from '@stores'
import { useMount } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 本地管理页面逻辑 */
export function useSmbPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useMount(() => {
    $.init()
  })

  return context
}
