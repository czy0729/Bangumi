/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:59:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:01:49
 */
import {
  MANGA_COLLECTED,
  MANGA_FIRST,
  MANGA_SORT,
  MANGA_STATUS,
  MANGA_TAGS,
  MANGA_YEAR
} from '@utils/subject/manga'
import { LIST_EMPTY } from '@constants'
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenManga'

export const STATE = {
  query: {
    first: '',
    year: 2022,
    begin: '',
    status: '',
    tags: [],
    hd: '',
    sort: '评分人数',
    collected: ''
  },
  data: LIST_EMPTY,
  layout: 'list',
  expand: false,
  _loaded: false as Loaded
}

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
  },
  {
    title: '收藏',
    type: 'collected',
    data: MANGA_COLLECTED
  }
] as const
