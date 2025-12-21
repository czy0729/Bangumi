/*
 * @Author: czy0729
 * @Date: 2025-07-17 13:16:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-17 15:20:33
 */
import React from 'react'
import Item from '../item'

export function keyExtractor(item: string) {
  return item
}

export function renderItem({ item }) {
  return <Item item={item} />
}
