/*
 * @Author: czy0729
 * @Date: 2024-04-17 19:41:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-17 19:43:19
 */
import React from 'react'
import Item from '../item'

import type { SubjectCatalogsItem } from '@stores/subject/types'
import type { RenderItem } from '@types'

export function renderItem({ item, index }: RenderItem<SubjectCatalogsItem>) {
  return <Item item={item} index={index} />
}
