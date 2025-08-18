/*
 * @Author: czy0729
 * @Date: 2024-03-16 15:53:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-16 19:27:00
 */
import React from 'react'
import Item from '../item'

export function keyExtractor(item: any) {
  return String(item)
}

export function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}
