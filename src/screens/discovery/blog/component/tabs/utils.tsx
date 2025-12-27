/*
 * @Author: czy0729
 * @Date: 2025-12-28 05:50:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-28 05:50:29
 */
import React from 'react'
import List from '../list'

import type { BlogType } from '../../types'

export function renderItem(item) {
  return <List key={item.key} type={item.key as BlogType} />
}
