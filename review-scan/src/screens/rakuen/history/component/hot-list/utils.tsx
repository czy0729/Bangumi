/*
 * @Author: czy0729
 * @Date: 2024-11-01 10:20:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-01 12:05:23
 */
import React from 'react'
import { CollectRankItem } from '../../types'
import Item from './item'

export function keyExtractor(item: CollectRankItem) {
  return item.topic_id
}

export function renderItem({ item }: { item: CollectRankItem }) {
  return <Item item={item} />
}
