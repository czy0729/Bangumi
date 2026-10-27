/*
 * @Author: czy0729
 * @Date: 2024-01-18 05:55:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-28 00:00:00
 */
import List from '../list'

import type { TabsKey } from '../../types'

export function renderItem(item: { key: TabsKey }) {
  return <List key={item.key} id={item.key} />
}
