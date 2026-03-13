/*
 * @Author: czy0729
 * @Date: 2025-03-14 07:49:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-15 00:50:07
 */
import React from 'react'
import Item from '../item'

export function keyExtractor(item: any) {
  return `${item.i}${item.d}`
}

export function renderItem({ item }) {
  return <Item {...item} />
}
