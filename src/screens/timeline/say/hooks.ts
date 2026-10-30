/*
 * @Author: czy0729
 * @Date: 2024-01-18 07:00:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 吐槽页 Store 的初始化与卸载
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 吐槽页面逻辑 */
export function useSayPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  usePageLifecycle(
    {
      onEnter() {
        // 新建吐槽要尽快拿到表单授权码, 等转场结束会来不及
        if ($.isNew) $.init()
      },
      onEnterComplete() {
        if (!$.isNew) $.init()
      },
      onLeaveComplete() {
        $.unmount()
      }
    },
    id
  )

  return context
}
