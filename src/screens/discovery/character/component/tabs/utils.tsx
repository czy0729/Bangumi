/*
 * @Author: czy0729
 * @Date: 2024-04-06 14:29:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 15:53:53
 */
import React from 'react'
import List from '../list'

export function renderItem(item: any) {
  return <List id={item.key} />
}
