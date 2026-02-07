/*
 * @Author: czy0729
 * @Date: 2024-11-19 10:50:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 11:10:47
 */
import { useCallback, useState } from 'react'
import { useInitStore } from '@stores'
import { hm } from '@utils/fetch'
import { useMount, useRunAfter } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

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
