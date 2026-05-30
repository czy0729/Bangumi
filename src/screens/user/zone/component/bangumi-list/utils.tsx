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
import type { CollectionStatusCn } from '@types'

type Section = {
  section: {
    title: string
    status: CollectionStatusCn
    count: number
  }
}

type ItemSection = Section & {
  item: CollectionsItem
}

export function renderSectionHeader({ section: { title, status, count } }: Section) {
  return <SectionHeader title={title} status={status} count={count} />
}

export function renderItem({
  item,
  section: { status }
}: ItemSection) {
  return <Item item={item} status={status} />
}
