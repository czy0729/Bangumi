/*
 * @Author: czy0729
 * @Date: 2024-04-06 12:45:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 12:51:32
 */
import React from 'react'
import Item from '../item'

import type { DollarsItem } from '@stores/discovery/types'
import type { RenderItem } from '@types'

export function renderItem({ item, index }: RenderItem<DollarsItem>) {
  return <Item index={index} {...item} />
}
