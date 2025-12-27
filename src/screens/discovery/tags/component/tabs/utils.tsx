/*
 * @Author: czy0729
 * @Date: 2024-04-05 04:37:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-28 05:56:50
 */
import React from 'react'
import List from '../list'

import type { TABS } from '../../ds'

export function renderItem(item: (typeof TABS)[number]) {
  return <List key={item.key} id={item.key} />
}
