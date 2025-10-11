/*
 * @Author: czy0729
 * @Date: 2024-02-10 13:53:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 22:45:14
 */
import React from 'react'
import ListItem from '../list-item'

export function keyExtractor(item: any) {
  return String(item.data)
}

export function renderItem({ item, index }) {
  return <ListItem item={item} index={index} />
}
