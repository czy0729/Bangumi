/*
 * @Author: czy0729
 * @Date: 2026-04-20 11:04:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 11:24:06
 */
import React from 'react'
import Item from '../item'

import type { RatingItem } from '@stores/subject/types'
import type { RenderItem } from '@types'

export function renderItem({ item }: RenderItem<RatingItem>) {
  return <Item {...item} />
}
