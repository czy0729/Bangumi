/*
 * @Author: czy0729
 * @Date: 2024-01-18 05:55:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 05:55:52
 */
import React from 'react'
import { TabsKey } from '../../types'
import List from '../list'

export function renderItem(item: { key: TabsKey }) {
  return <List id={item.key} />
}
