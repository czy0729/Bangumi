/*
 * @Author: czy0729
 * @Date: 2024-01-12 05:58:43
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-12 05:58:43
 */
import React from 'react'
import Item from '../item'

export function renderItem({ index, item }) {
  return <Item index={index} item={item} />
}
