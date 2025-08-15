/*
 * @Author: czy0729
 * @Date: 2024-03-05 03:32:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 03:42:00
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 我的持仓页面逻辑 */
export function useTinygrailCharaAssetsPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    if ($.params.form === 'lottery') {
      $.initFormLottery()
    } else {
      $.init()
    }
  })

  return context
}
