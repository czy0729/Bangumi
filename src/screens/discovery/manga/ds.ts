/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:59:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:18:06
 */
import {
  MANGA_COLLECTED,
  MANGA_SORT,
  MANGA_STATUS,
  MANGA_TAGS,
  MANGA_YEAR
} from '@utils/subject/manga'
import { MANGA_AUTHORS } from '@utils/subject/manga/ds'

export const COMPONENT = 'Manga'

export const ADVANCE_LIMIT = 60

// 类型分组
const MANGA_TAGS_GROUP = [[], [], []]
MANGA_TAGS.forEach((item, index) => {
  if (index % 3 === 0) {
    MANGA_TAGS_GROUP[0].push(item)
  } else if (index % 3 === 1) {
    MANGA_TAGS_GROUP[1].push(item)
  } else {
    MANGA_TAGS_GROUP[2].push(item)
  }
})

export const filterDS = [
  {
    title: '开始',
    type: 'year',
    data: MANGA_YEAR,
    always: true
  },
  {
    title: '结束',
    type: 'end',
    data: MANGA_YEAR
  },
  {
    title: '更新',
    type: 'update',
    data: MANGA_YEAR
  },
  {
    title: '状态',
    type: 'status',
    data: MANGA_STATUS
  },
  {
    title: '类型',
    type: 'tags',
    data: MANGA_TAGS_GROUP,
    multiple: true,
    multiSelect: true
  },
  {
    title: '作者',
    type: 'author',
    data: MANGA_AUTHORS
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
