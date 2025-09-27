/*
 * @Author: czy0729
 * @Date: 2024-11-04 16:28:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 16:28:55
 */
import React from 'react'
import Item from './item'

export function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}
