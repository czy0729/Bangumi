/*
 * @Author: czy0729
 * @Date: 2024-02-04 01:09:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-17 12:15:42
 */
import React from 'react'
import Item from '../item'
import { ENTERING_EXITING_ANIMATIONS_NUM } from './ds'

export function keyExtractor(item: { href: any }, index: number) {
  return `${item.href}|${index < ENTERING_EXITING_ANIMATIONS_NUM}`
}

export function renderItem({ item, index }) {
  return <Item index={index} {...item} />
}
