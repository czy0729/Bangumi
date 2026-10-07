/*
 * @Author: czy0729
 * @Date: 2021-06-26 06:43:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-30 23:43:22
 */
import { groupItems } from '@_'
import {
  ADV_COLLECTED,
  ADV_DEV,
  ADV_PLATFORM,
  ADV_SORT,
  ADV_TAGS,
  ADV_YEAR
} from '@utils/subject/adv'
import { ADV_CN, ADV_PLAYTIME } from '@utils/subject/adv/ds'

export const COMPONENT = 'ADV'

export const ADVANCE_LIMIT = 60

/** 类型分组 */
const ADV_DEV_GROUP = groupItems(ADV_DEV, 2)

/** 标签三行分组 (横向滚动, 三行同显, 同 music 的 MUSIC_TAG_GROUP) */
const ADV_TAG_GROUP = groupItems(ADV_TAGS)

/** 分级 (「全部」由通用筛选组提供, 点击时写入空串) */
export const ADV_NSFW = ['限制', '未知'] as const

/** 筛选行顺序统一见 web/standalone/DIMENSIONS.md §一.8 */
export const FILTER_DS = [
  {
    title: '发行',
    type: 'year',
    data: ADV_YEAR,
    always: true
  },
  {
    title: '平台',
    type: 'platform',
    data: ADV_PLATFORM
  },
  {
    title: '标签',
    type: 'tag',
    data: ADV_TAG_GROUP,
    multiple: true
  },
  {
    title: '时长',
    type: 'playtime',
    data: ADV_PLAYTIME
  },
  {
    title: '开发',
    type: 'dev',
    data: ADV_DEV_GROUP,
    multiple: true
  },
  {
    title: '汉化',
    type: 'cn',
    data: ADV_CN
  },
  {
    title: '分级',
    type: 'x',
    data: ADV_NSFW
  },
  {
    title: '排序',
    type: 'sort',
    data: ADV_SORT,
    always: true
  },
  {
    title: '收藏',
    type: 'collected',
    data: ADV_COLLECTED
  }
] as const

export const HM = ['adv', 'ADV'] as const
