/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-03 00:00:00
 */
import { groupItems } from '@_'
import {
  REAL_COLLECTED,
  REAL_FORM,
  REAL_NSFW,
  REAL_REGION,
  REAL_SORT,
  REAL_TAGS,
  REAL_YEAR
} from '@utils/subject/real'

export const COMPONENT = 'Real'

export const ADVANCE_LIMIT = 60

/** 标签三行分组 (横向滚动, 三行同显, 同 music 的 MUSIC_TAG_GROUP) */
const REAL_TAG_GROUP = groupItems(REAL_TAGS)

/** 筛选行顺序统一见 web/standalone/DIMENSIONS.md §一.8 */
export const filterDS = [
  {
    title: '地区',
    type: 'region',
    data: REAL_REGION
  },
  {
    title: '年份',
    type: 'year',
    data: REAL_YEAR,
    always: true
  },
  {
    title: '形式',
    type: 'form',
    data: REAL_FORM
  },
  {
    title: '标签',
    type: 'tag',
    data: REAL_TAG_GROUP,
    multiple: true
  },
  {
    title: '分级',
    type: 'x',
    data: REAL_NSFW
  },
  {
    title: '排序',
    type: 'sort',
    data: REAL_SORT,
    always: true
  },
  {
    title: '收藏',
    type: 'collected',
    data: REAL_COLLECTED
  }
] as const

export const HM = ['real', 'Real'] as const
