/*
 * @Author: czy0729
 * @Date: 2024-01-15 22:16:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 22:17:06
 */
import React from 'react'
import Item from '../item'

export function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}
