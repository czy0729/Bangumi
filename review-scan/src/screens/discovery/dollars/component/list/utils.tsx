/*
 * @Author: czy0729
 * @Date: 2024-04-06 12:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 12:51:32
 */
import React from 'react'
import Item from '../item'

export function renderItem({ item, index }) {
  return <Item key={item.id} index={index} {...item} />
}
