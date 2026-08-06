/*
 * @Author: czy0729
 * @Date: 2024-11-04 16:28:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 16:28:55
 */
import React from 'react'
import Item from './item'

import type { RenderItem } from '@types'
import type { CollectionsV0Item } from '../../../types'

export function renderItem({ item, index }: RenderItem<CollectionsV0Item>) {
  return <Item item={item} index={index} />
}
