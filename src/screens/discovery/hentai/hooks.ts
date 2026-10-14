/*
 * @Author: czy0729
 * @Date: 2024-11-16 11:09:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找 Hentai 页面逻辑
 */
import { useDiscoveryListPage } from '@_'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

export function useHentaiPage(props: NavigationProps) {
  return useDiscoveryListPage<Ctx['$']>(props, store)
}
