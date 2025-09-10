/*
 * @Author: czy0729
 * @Date: 2024-01-09 13:26:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-10 10:38:31
 */
import React from 'react'
import { SearchItem } from '@stores/search/types'
import { RenderItem } from '@types'
import Item from '../item'

export function renderItem({ item, index }: RenderItem<SearchItem>) {
  return <Item {...item} index={index} />
}
