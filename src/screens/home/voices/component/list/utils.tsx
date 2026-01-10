/*
 * @Author: czy0729
 * @Date: 2024-06-02 16:30:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-06-02 16:30:42
 */
import React from 'react'
import Item from '../item'

import type { MonoVoicesItem } from '@stores/subject/types'
import type { RenderItem } from '@types'

export function renderItem({ item, index }: RenderItem<MonoVoicesItem>) {
  return <Item item={item} index={index} />
}
