/*
 * @Author: czy0729
 * @Date: 2025-12-26 17:54:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-26 21:08:38
 */
import React from 'react'
import List from '../list'

export function renderItem(item) {
  return <List key={item.key} id={item.key} />
}
