/*
 * @Author: czy0729
 * @Date: 2024-01-12 05:58:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 06:30:48
 */
import React from 'react'
import Blog from '../blog'
import Ep from '../ep'
import Item from '../item'
import Mono from '../mono'
import Topic from '../topic'

import type {
  CatalogDetailBlogItem,
  CatalogDetailEpItem,
  CatalogDetailMonoItem,
  CatalogDetailTopicItem
} from '@stores/discovery/types'
import type { WithIndex, WithItem } from '@types'
import type { ListItem } from '../../types'

export function renderItem({ index, item }: WithIndex<WithItem<ListItem>>) {
  return <Item index={index} item={item} />
}

export function renderMonoItem({ index, item }: WithIndex<WithItem<CatalogDetailMonoItem>>) {
  return <Mono index={index} item={item} />
}

export function renderTopicItem({ index, item }: WithIndex<WithItem<CatalogDetailTopicItem>>) {
  return <Topic index={index} item={item} />
}

export function renderEpItem({ index, item }: WithIndex<WithItem<CatalogDetailEpItem>>) {
  return <Ep index={index} item={item} />
}

export function renderBlogItem({ index, item }: WithIndex<WithItem<CatalogDetailBlogItem>>) {
  return <Blog index={index} item={item} />
}
