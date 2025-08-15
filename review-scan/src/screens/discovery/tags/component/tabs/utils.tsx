/*
 * @Author: czy0729
 * @Date: 2024-04-05 04:37:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 17:03:48
 */
import React from 'react'
import { TABS } from '../../ds'
import List from '../list'

export function renderItem(item: (typeof TABS)[number]) {
  return <List id={item.key} />
}
