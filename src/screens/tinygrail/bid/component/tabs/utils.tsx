/*
 * @Author: czy0729
 * @Date: 2025-12-08 06:58:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-08 06:59:04
 */
import React from 'react'
import List from '../list'

export function renderItem(item) {
  return <List key={item.key} id={item.key} />
}
