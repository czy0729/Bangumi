/*
 * @Author: czy0729
 * @Date: 2025-12-26 17:54:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-17 09:14:47
 */
import React from 'react'
import List from '../list'

import type { TabsItem } from '../../types'

export function renderItem(item: TabsItem) {
  return <List key={item.key} id={item.key} />
}
