/*
 * @Author: czy0729
 * @Date: 2024-03-22 07:55:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 16:16:59
 */
import React from 'react'
import Item from '../item'

export function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}
