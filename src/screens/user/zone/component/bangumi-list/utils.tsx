/*
 * @Author: czy0729
 * @Date: 2024-08-22 23:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-14 04:32:31
 */
import React from 'react'
import Item from './item'
import SectionHeader from './section-header'

import type { CollectionsItem } from '@stores/user/types'
import type { CollectionStatusCn, RenderSection } from '@types'

export function renderSectionHeader({ section: { title, count } }) {
  return <SectionHeader title={title} count={count} />
}

export function renderItem({
  item,
  section: { title }
}: RenderSection<CollectionStatusCn, CollectionsItem>) {
  return <Item item={item} title={title} />
}
