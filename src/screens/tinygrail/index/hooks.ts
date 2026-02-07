/*
 * @Author: czy0729
 * @Date: 2024-03-04 19:09:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 07:56:44
 */
import { useCallback } from 'react'
import { StatusBar } from '@components'
import { _, useInitStore } from '@stores'
import { hm } from '@utils/fetch'
import { useFocusEffect, useRunAfter } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 小圣杯页面逻辑 */
export function useTinygrailPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()

    hm('tinygrail', 'Tinygrail')
  })

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        StatusBar.setBarStyle(_.select('dark-content', 'light-content'))
      }, 40)
    }, [])
  )

  return context
}
