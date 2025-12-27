/*
 * @Author: czy0729
 * @Date: 2025-12-28 05:55:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-28 05:55:56
 */
import React from 'react'
import List from '../list'

import type { ItemProps } from './types'

export function renderItem(item: ItemProps) {
  return <List key={item.key} id={item.key} />
}
