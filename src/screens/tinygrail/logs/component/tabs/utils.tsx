/*
 * @Author: czy0729
 * @Date: 2024-03-10 17:25:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-06 15:06:46
 */
import List from '../list'

import type { TABS } from '../../ds'

export function renderItem(item: (typeof TABS)[number]) {
  return <List key={item.key} title={item.title} />
}
