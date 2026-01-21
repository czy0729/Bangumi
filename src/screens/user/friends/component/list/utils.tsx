/*
 * @Author: czy0729
 * @Date: 2022-08-07 03:53:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 11:52:58
 */
import React from 'react'
import Item from '../item'
import Section from '../section'

import type { RenderItem } from '@types'
import type { ListItem } from '../../types'

export function renderItem({ item, index }: RenderItem<ListItem>) {
  if (item.type === 'header') return <Section title={item.title} />

  return <Item item={item.item} index={index} />
}

export function keyExtractor(item: ListItem) {
  return `${item.type}|${item.key}`
}
