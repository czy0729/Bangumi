/*
 * @Author: czy0729
 * @Date: 2024-03-18 21:13:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-18 21:32:02
 */
import React from 'react'
import Item from '../item'

export function keyExtractor(item: any) {
  return String(item)
}

export function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}
