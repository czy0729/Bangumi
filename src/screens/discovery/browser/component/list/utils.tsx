/*
 * @Author: czy0729
 * @Date: 2024-01-11 05:20:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 05:20:49
 */
import React from 'react'
import Item from '../item'

export function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}
