/*
 * @Author: czy0729
 * @Date: 2024-01-09 13:26:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-31 02:54:29
 */
import React from 'react'
import Item from '../item'

import type { SearchItem } from '@stores/search/types'
import type { RenderItem } from '@types'

export function renderItem({ item, index }: RenderItem<SearchItem>) {
  return <Item {...item} index={index} />
}
