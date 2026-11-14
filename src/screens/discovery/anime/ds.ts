/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:07:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 02:25:35
 *
 * 页面常量: 筛选维度与分组
 */
import { groupItems } from '@_'
import {
  ANIME_AREA,
  ANIME_BEGIN,
  ANIME_COLLECTED,
  ANIME_COUNTS,
  ANIME_EP,
  ANIME_META,
  ANIME_NSFW,
  ANIME_OFFICIAL,
  ANIME_SORT,
  ANIME_STATUS,
  ANIME_TAGS,
  ANIME_YEAR
} from '@utils/subject/anime'

export const COMPONENT = 'Anime'

export const ADVANCE_LIMIT = 80

/** 类型 meta 分组 */
const ANIME_META_GROUP = groupItems(ANIME_META)

/** 标签分组 */
const ANIME_TAGS_GROUP = groupItems(ANIME_TAGS)

/** 制作分组 */
const ANIME_OFFICIAL_GROUP = groupItems(ANIME_OFFICIAL, 2)

export const FILTER_DS = [
  {
    title: '地区',
    type: 'area',
    data: ANIME_AREA,
    nums: ANIME_COUNTS.area
  },
  {
    title: '年份',
    type: 'year',
    data: ANIME_YEAR,
    nums: ANIME_COUNTS.year,
    always: true
  },
  {
    title: '季度',
    type: 'begin',
    data: ANIME_BEGIN,
    nums: ANIME_COUNTS.begin,
    always: true
  },
  {
    title: '状态',
    type: 'status',
    data: ANIME_STATUS,
    nums: ANIME_COUNTS.status
  },
  {
    title: '类型',
    type: 'meta',
    data: ANIME_META_GROUP,
    nums: ANIME_COUNTS.meta,
    multiple: true,
    multiSelect: true
  },
  {
    title: '标签',
    type: 'tags',
    data: ANIME_TAGS_GROUP,
    nums: ANIME_COUNTS.tags,
    multiple: true,
    multiSelect: true
  },
  {
    title: '集数',
    type: 'ep',
    data: ANIME_EP,
    nums: ANIME_COUNTS.ep
  },
  {
    title: '制作',
    type: 'official',
    data: ANIME_OFFICIAL_GROUP,
    nums: ANIME_COUNTS.official,
    multiple: true
  },
  {
    title: '分级',
    type: 'x',
    data: ANIME_NSFW,
    nums: ANIME_COUNTS.x
  },
  {
    title: '排序',
    type: 'sort',
    data: ANIME_SORT,
    always: true
  },
  {
    title: '收藏',
    type: 'collected',
    data: ANIME_COLLECTED
  }
] as const
