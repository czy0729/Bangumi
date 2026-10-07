/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 00:00:00
 */
import { groupItems } from '@_'
import {
  MANGA_CH,
  MANGA_COLLECTED,
  MANGA_NSFW,
  MANGA_PUBLISHERS,
  MANGA_SORT,
  MANGA_TAGS,
  MANGA_VOL,
  MANGA_YEAR
} from '@utils/subject/manga'

export const COMPONENT = 'Manga'

export const ADVANCE_LIMIT = 60

/** 标签三行分组 (横向滚动, 三行同显, 同 music / real 的 TAG_GROUP; 平台 / 出版社 / 噪音词已在数据侧剔除) */
const MANGA_TAG_GROUP = groupItems(MANGA_TAGS)

/** 出版社两行分组 */
const MANGA_PUBLISHER_GROUP = groupItems(MANGA_PUBLISHERS, 2)

/** 筛选行顺序统一见 web/standalone/DIMENSIONS.md §一.8 */
export const filterDS = [
  {
    title: '开始',
    type: 'start',
    data: MANGA_YEAR,
    always: true
  },
  {
    title: '更新',
    type: 'update',
    data: MANGA_YEAR
  },
  {
    title: '结束',
    type: 'end',
    data: MANGA_YEAR
  },
  {
    title: '出版',
    type: 'publisher',
    data: MANGA_PUBLISHER_GROUP,
    multiple: true
  },
  {
    title: '标签',
    type: 'tag',
    data: MANGA_TAG_GROUP,
    multiple: true
  },
  {
    title: '卷数',
    type: 'vol',
    data: MANGA_VOL
  },
  {
    title: '话数',
    type: 'ch',
    data: MANGA_CH
  },
  {
    title: '分级',
    type: 'x',
    data: MANGA_NSFW
  },
  {
    title: '排序',
    type: 'sort',
    data: MANGA_SORT,
    always: true
  },
  {
    title: '收藏',
    type: 'collected',
    data: MANGA_COLLECTED
  }
] as const

export const HM = ['manga', 'Manga'] as const
