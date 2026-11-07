/*
 * @Author: czy0729
 * @Date: 2024-08-22 23:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 01:38:34
 *
 * 收藏分组区块与条目渲染
 */
import Item from './item'
import SectionHeader from './section-header'

import type { CollectionsItem } from '@stores/user/types'
import type { Props as SectionHeaderProps } from './section-header/types'

/** 分组内的收藏条目 */
export type SectionItem = Pick<CollectionsItem, 'list'>

export type Section = SectionHeaderProps & {
  /** 分组数据 */
  data: SectionItem[]
}

type SectionInfo = {
  section: Section
}

type ItemInfo = {
  item: SectionItem
  section: Section
}

export function renderSectionHeader({ section: { title, status, count } }: SectionInfo) {
  return <SectionHeader title={title} status={status} count={count} />
}

export function renderItem({
  item,
  section: { status }
}: ItemInfo) {
  return <Item item={item} status={status} />
}
