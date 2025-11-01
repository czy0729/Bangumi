/*
 * @Author: czy0729
 * @Date: 2024-11-01 10:20:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-31 20:50:26
 */
import React from 'react'
import Item from './item'

import type { RenderItem } from '@types'
import type { CollectRankItem } from '../../types'

export function keyExtractor(item: CollectRankItem) {
  return item.topic_id
}

export function renderItem({ item }: RenderItem<CollectRankItem>) {
  return <Item item={item} />
}
