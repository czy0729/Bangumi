/*
 * @Author: czy0729
 * @Date: 2024-03-06 09:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:01:57
 */
import { useInitStore } from '@stores'
import { useMount, useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 资产重组页面逻辑 */
export function useTinygrailSacrificePage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  /** 页面销毁 */
  useMount(() => {
    return () => {
      $.setState({
        mounted: false
      })
    }
  })

  return context
}
