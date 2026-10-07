/*
 * @Author: czy0729
 * @Date: 2024-11-16 10:13:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 */
import { useDiscoveryListPage } from '@_'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 找番剧页面逻辑 */
export function useAnimePage(props: NavigationProps) {
  return useDiscoveryListPage<Ctx['$']>(props, store, true)
}
