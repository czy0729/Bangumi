/*
 * @Author: czy0729
 * @Date: 2024-03-11 17:06:37
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-03-11 17:06:37
 */
import React from 'react'
import List from '../list'

export function renderItem(item: any) {
  return <List key={item.key} id={item.key} title={item.title} />
}
