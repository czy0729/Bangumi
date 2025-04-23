/*
 * @Author: czy0729
 * @Date: 2025-04-23 07:57:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-23 07:58:18
 */
import React from 'react'
import List from '../list'

export function renderItem(item: any) {
  return <List id={item.key} />
}
