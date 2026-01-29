/*
 * @Author: czy0729
 * @Date: 2024-08-23 00:19:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-29 12:45:09
 */
import React from 'react'
import { SectionHeader } from '@_'
import Item from './item'

import type { TimelineItem } from '@stores/timeline/types'
import type { RenderItem, RenderSectionHeader } from '@types'

export function renderSectionHeader({ section: { title } }: RenderSectionHeader<string>) {
  return <SectionHeader>{title}</SectionHeader>
}

export function renderItem({ item, index }: RenderItem<TimelineItem>) {
  return <Item index={index} item={item} />
}
