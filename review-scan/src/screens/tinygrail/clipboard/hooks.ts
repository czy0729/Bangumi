/*
 * @Author: czy0729
 * @Date: 2024-11-19 06:29:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 09:35:32
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 粘贴板页面逻辑 */
export function useTinygrailClipboardPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $, navigation } = context

  useRunAfter(() => {
    $.init(navigation)
  })

  return context
}
