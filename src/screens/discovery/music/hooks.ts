/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 *
 * 找音乐页面逻辑
 */
import { useDiscoveryListPage } from '@_'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 找音乐页面逻辑 */
export function useMusicPage(props: NavigationProps) {
  return useDiscoveryListPage<Ctx['$']>(props, store)
}
