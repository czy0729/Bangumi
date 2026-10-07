/*
 * @Author: czy0729
 * @Date: 2024-11-16 11:09:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 *
 * 找 NSFW 页面逻辑
 */
import { useDiscoveryListPage } from '@_'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 找 NSFW 页面逻辑 */
export function useNSFWPage(props: NavigationProps) {
  return useDiscoveryListPage<Ctx['$']>(props, store)
}
