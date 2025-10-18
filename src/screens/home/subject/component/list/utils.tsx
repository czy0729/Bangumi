/*
 * @Author: czy0729
 * @Date: 2024-01-09 16:19:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-23 05:40:45
 */
import React from 'react'
import Item from '../item'

import type { SubjectCommentsItem } from '@stores/subject/types'
import type { RenderItem } from '@types'

export function renderItem({ item, index }: RenderItem<SubjectCommentsItem>) {
  return <Item {...item} index={index} />
}
