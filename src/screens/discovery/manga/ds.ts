/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:59:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-11 21:05:48
 */
import {
  MANGA_FIRST,
  MANGA_YEAR,
  MANGA_STATUS,
  MANGA_TAGS,
  MANGA_SORT
} from '@utils/subject/manga'

export const ADVANCE_LIMIT = 120

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
    title: '首字',
    type: 'first',
    data: MANGA_FIRST
  },
  {
    title: '年份',
    type: 'year',
    data: MANGA_YEAR,
    always: true
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
    title: '排序',
    type: 'sort',
    data: MANGA_SORT,
    always: true
  }
] as const
