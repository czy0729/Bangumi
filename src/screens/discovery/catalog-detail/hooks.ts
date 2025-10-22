/*
 * @Author: czy0729
 * @Date: 2024-04-07 08:55:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 10:28:07
 */
import { useCallback } from 'react'
import { useOnScroll } from '@components/header/utils'
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx, HandleScroll } from './types'

/** 目录详情页面逻辑 */
export function useCatalogDetailPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  const { fixed, onScroll } = useOnScroll()
  const handleScroll = useCallback<HandleScroll>(
    evt => {
      $.onScroll(evt)
      onScroll(evt)
    },
    [$, onScroll]
  )

  usePageLifecycle(
    {
      onEnterComplete() {
        $.init()
      },
      onLeaveComplete() {
        $.unmount()
      }
    },
    id
  )

  return {
    ...context,
    fixed,
    handleScroll
  }
}
