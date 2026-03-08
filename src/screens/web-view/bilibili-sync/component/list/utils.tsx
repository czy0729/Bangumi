/*
 * @Author: czy0729
 * @Date: 2024-09-14 16:09:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 16:10:15
 */
import React from 'react'
import Item from '../item'

import type { RenderItem } from '@types'
import type { BilibiliItem } from '../../types'

export function renderItem({ item }: RenderItem<BilibiliItem>) {
  return <Item item={item} />
}
