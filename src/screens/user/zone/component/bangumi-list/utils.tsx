/*
 * @Author: czy0729
 * @Date: 2024-08-22 23:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-14 04:32:31
 */
import React from 'react'
import { CollectionsItem } from '@stores/user/types'
import { CollectionStatusCn, RenderSection } from '@types'
import Item from './item'
import SectionHeader from './section-header'

export function renderSectionHeader({ section: { title, count } }) {
  return <SectionHeader title={title} count={count} />
}

export function renderItem({
  item,
  section: { title }
}: RenderSection<CollectionStatusCn, CollectionsItem>) {
  return <Item item={item} title={title} />
}
