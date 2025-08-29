/*
 * @Author: czy0729
 * @Date: 2022-08-07 03:53:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-12 02:42:03
 */
import React from 'react'
import ItemGrid from '../item-grid'

export function renderItem({ item, index }) {
  return <ItemGrid index={index} item={item} />
}

export function keyExtractor(item: { userId: any }) {
  return String(item.userId)
}
