/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 02:25:40
 *
 * 页面常量: 筛选维度与分组
 */
import { groupItems } from '@_'
import {
  MUSIC_COLLECTED,
  MUSIC_COUNTS,
  MUSIC_NSFW,
  MUSIC_SORT,
  MUSIC_TAGS,
  MUSIC_YEAR
} from '@utils/subject/music'

export const COMPONENT = 'Music'

export const ADVANCE_LIMIT = 60

/** 标签三行分组 (横向滚动, 三行同显, 同 game 的 GAME_CATE_GROUP) */
const MUSIC_TAG_GROUP = groupItems(MUSIC_TAGS)

/** 筛选行顺序统一见 web/standalone/DIMENSIONS.md §一.8 */
export const filterDS = [
  {
    title: '年份',
    type: 'year',
    data: MUSIC_YEAR,
    nums: MUSIC_COUNTS.year,
    always: true
  },
  {
    title: '标签',
    type: 'tag',
    data: MUSIC_TAG_GROUP,
    nums: MUSIC_COUNTS.tag,
    multiple: true
  },
  {
    title: '分级',
    type: 'x',
    data: MUSIC_NSFW,
    nums: MUSIC_COUNTS.x
  },
  {
    title: '排序',
    type: 'sort',
    data: MUSIC_SORT,
    always: true
  },
  {
    title: '收藏',
    type: 'collected',
    data: MUSIC_COLLECTED
  }
] as const

export const HM = ['music', 'Music'] as const
