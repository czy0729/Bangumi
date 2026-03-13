/*
 * @Author: czy0729
 * @Date: 2024-06-22 16:55:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-22 17:21:56
 */
import React from 'react'
import Item from '../item'

export function keyExtractor(item: any, index: number) {
  return String(item.id || index)
}

export function renderItem({ item, index }) {
  return <Item {...item} index={index} />
}
