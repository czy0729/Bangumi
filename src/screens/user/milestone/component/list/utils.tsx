/*
 * @Author: czy0729
 * @Date: 2024-10-11 22:59:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-11 23:00:38
 */
import React from 'react'
import Item from '../item'

export function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}
