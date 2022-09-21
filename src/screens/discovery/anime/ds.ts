/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:07:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-10 16:55:35
 */
import {
  ANIME_AREA,
  ANIME_TYPE,
  ANIME_FIRST,
  ANIME_YEAR,
  ANIME_BEGIN,
  ANIME_STATUS,
  ANIME_TAGS,
  ANIME_OFFICIAL,
  ANIME_SORT
} from '@utils/subject/anime'

// 类型分组
const ANIME_TAGS_GROUP = [[], [], []]
ANIME_TAGS.forEach((item, index) => {
  const mod = index % 3
  if (mod === 0) {
    ANIME_TAGS_GROUP[0].push(item)
  } else if (mod === 1) {
    ANIME_TAGS_GROUP[1].push(item)
  } else {
    ANIME_TAGS_GROUP[2].push(item)
  }
})

// 制作分组
const ANIME_OFFICIAL_GROUP = [[], [], []]
ANIME_OFFICIAL.forEach((item, index) => {
  const mod = index % 3
  if (mod === 0) {
    ANIME_OFFICIAL_GROUP[0].push(item)
  } else if (mod === 1) {
    ANIME_OFFICIAL_GROUP[1].push(item)
  } else {
    ANIME_OFFICIAL_GROUP[2].push(item)
  }
})

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
    title: '首字',
    type: 'first',
    data: ANIME_FIRST
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
  }
] as const
