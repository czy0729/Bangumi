/*
 * @Author: czy0729
 * @Date: 2026-10-05 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 *
 * 找XX 列表页公共逻辑
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'

import type { NavigationProps } from '@types'

/** 找XX 页面逻辑: 进入时 init, 需要重置的页面离开时 unmount */
export function useDiscoveryListPage<T extends { init: () => unknown; unmount?: () => unknown }>(
  props: NavigationProps,
  Store: new () => T,
  destroy?: boolean
) {
  const context = useInitStore<T>(props, Store)
  const { id, $ } = context

  usePageLifecycle(
    destroy
      ? {
          onEnterComplete() {
            $.init()
          },
          onLeaveComplete() {
            $.unmount?.()
          }
        }
      : {
          onEnterComplete() {
            $.init()
          }
        },
    id
  )

  return context
}
