/*
 * @Author: czy0729
 * @Date: 2024-02-04 01:09:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-04 01:10:16
 */
import React from 'react'
import Item from '../item'

export function keyExtractor(item: { href: any }) {
  return item.href
}

export function renderItem({ item, index }) {
  return <Item index={index} {...item} />
}
