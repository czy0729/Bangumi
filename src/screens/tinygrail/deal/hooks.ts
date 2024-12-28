/*
 * @Author: czy0729
 * @Date: 2024-11-19 10:50:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-28 05:45:48
 */
import { useCallback, useState } from 'react'
import { useInitStore } from '@stores'
import { hm } from '@utils/fetch'
import { useMount, useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 交易页面逻辑 */
export function useTinygrailDealPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  useMount(() => {
    hm(`tinygrail/deal/${$.monoId}`, 'TinygrailDeal')
  })

  const [refreshing, setRefreshing] = useState(false)
  const handleRefresh = useCallback(() => {
    setRefreshing(true)

    setTimeout(async () => {
      await $.refresh()

      setTimeout(() => {
        setRefreshing(false)
      }, 1200)
    }, 0)
  }, [$])

  return {
    ...context,
    refreshing,
    handleRefresh
  }
}
