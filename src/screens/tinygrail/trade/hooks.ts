/*
 * @Author: czy0729
 * @Date: 2024-11-20 11:38:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-04 19:33:46
 */
import { useCallback, useState } from 'react'
import { useInitStore } from '@stores'
import { hm, t } from '@utils/fetch'
import { useIsFocused, useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** K 线页面逻辑 */
export function useTinygrailTradePage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $, navigation } = context

  useRunAfter(() => {
    $.init()

    hm(`tinygrail/trade/${$.monoId}`, 'TinygrailTrade')
  })

  const [showMask, setShowMask] = useState(true)
  const handleHideMask = useCallback(() => {
    setShowMask(false)
  }, [])

  const handleNavigate = useCallback(
    (type: string) => {
      navigation.push('TinygrailDeal', {
        monoId: $.monoId,
        type,
        form: 'kline'
      })

      t('K线.跳转', {
        to: 'TinygrailDeal',
        type,
        monoId: $.monoId
      })
    },
    [$.monoId, navigation]
  )

  const isFocused = useIsFocused()

  return {
    ...context,
    showMask,
    isFocused,
    handleHideMask,
    handleNavigate
  }
}
