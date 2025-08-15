/*
 * @Author: czy0729
 * @Date: 2024-05-08 04:24:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-05 13:40:05
 */
import React from 'react'
import ItemLazy from './item'

export function keyExtractor(item: any) {
  return String(item)
}

export function renderItem({ item }) {
  return <ItemLazy item={item} />
}
