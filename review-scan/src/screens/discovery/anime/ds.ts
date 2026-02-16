/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:07:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-26 03:55:48
 */
import {
  ANIME_AREA,
  ANIME_BEGIN,
  ANIME_COLLECTED,
  ANIME_OFFICIAL,
  ANIME_SORT,
  ANIME_STATUS,
  ANIME_TAGS,
  ANIME_TYPE,
  ANIME_YEAR
} from '@utils/subject/anime'

export const COMPONENT = 'Anime'

export const ADVANCE_LIMIT = 80

// 类型分组
const ANIME_TAGS_GROUP = [[], []]
ANIME_TAGS.forEach((item, index) => ANIME_TAGS_GROUP[index % 2 ? 1 : 0].push(item))

// 制作分组
const ANIME_OFFICIAL_GROUP = [[], []]
ANIME_OFFICIAL.forEach((item, index) => ANIME_OFFICIAL_GROUP[index % 2 ? 1 : 0].push(item))

export const filterDS = [
  {
    title: '地区',
    type: 'area',
    data: ANIME_AREA
  },
  {
    title: '版本',
    type: 'type',
    data: ANIME_TYPE
  },
  {
    title: '年份',
    type: 'year',
    data: ANIME_YEAR,
    always: true
  },
  {
    title: '季度',
    type: 'begin',
    data: ANIME_BEGIN,
    always: true
  },
  {
    title: '状态',
    type: 'status',
    data: ANIME_STATUS
  },
  {
    title: '类型',
    type: 'tags',
    data: ANIME_TAGS_GROUP,
    multiple: true,
    multiSelect: true
  },
  {
    title: '制作',
    type: 'official',
    data: ANIME_OFFICIAL_GROUP,
    multiple: true
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
