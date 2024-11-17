/*
 * @Author: czy0729
 * @Date: 2024-04-07 08:55:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:14:41
 */
import { useCallback } from 'react'
import { useOnScroll } from '@components/header/utils'
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 目录详情页面逻辑 */
export function useCatalogDetailPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  const { fixed, onScroll } = useOnScroll()
  const onScrollFn = useCallback(
    evt => {
      $.onScroll(evt)
      onScroll(evt)
    },
    [$, onScroll]
  )

  return {
    ...context,
    fixed,
    onScroll: onScrollFn
  }
}
