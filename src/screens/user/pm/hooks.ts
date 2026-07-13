/*
 * @Author: czy0729
 * @Date: 2024-11-18 07:03:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-13 23:11:44
 */
import { useCallback } from 'react'
import { useInitStore } from '@stores'
import { useBackHandler, usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 短信页面逻辑 */
export function usePMPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $, id } = context

  usePageLifecycle({}, id)

  const handleBackAndroid = useCallback(() => {
    if ($.state.thread) {
      $.onThreadChange('')
      return true
    }
    return false
  }, [$])
  useBackHandler(handleBackAndroid)

  return context
}
