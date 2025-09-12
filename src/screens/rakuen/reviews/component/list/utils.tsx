/*
 * @Author: czy0729
 * @Date: 2024-06-22 16:55:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-22 17:21:56
 */
import React from 'react'
import { ReviewsItem } from '@stores/rakuen/types'
import { RenderItem } from '@types'
import Item from '../item'

export function keyExtractor(item: ReviewsItem, index: number) {
  return String(item.id || index)
}

export function renderItem({ item, index }: RenderItem<ReviewsItem>) {
  return <Item {...item} index={index} />
}
