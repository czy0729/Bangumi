/*
 * @Author: czy0729
 * @Date: 2024-05-08 04:26:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-05 13:39:48
 */
import React from 'react'
import { SectionHeader } from '@_'
import Item from './item'

import type { RenderSection, RenderSectionHeader } from '@types'
import type { TopicItem } from '../../types'

export function keyExtractor(item: TopicItem) {
  return String(item.topicId)
}

export function renderSectionHeader({ section: { title } }: RenderSectionHeader<TopicItem>) {
  return <SectionHeader size={14}>{title}</SectionHeader>
}

export function renderItem({ item }: RenderSection<string, TopicItem>) {
  return <Item {...item} />
}
