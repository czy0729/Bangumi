/*
 * @Author: czy0729
 * @Date: 2024-04-02 17:28:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 19:54:51
 */
import React from 'react'
import Item from '../item'

export function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}
