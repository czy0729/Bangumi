/*
 * @Author: czy0729
 * @Date: 2021-06-26 07:07:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:18:49
 */
import {
  WENKU_ANIME,
  WENKU_AUTHOR,
  WENKU_CATE,
  WENKU_COLLECTED,
  WENKU_FIRST,
  WENKU_SORT,
  WENKU_STATUS,
  WENKU_TAGS,
  WENKU_YEAR
} from '@utils/subject/wenku'
import { LIST_EMPTY } from '@constants'
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenWenku'

export const STATE = {
  query: {
    first: '',
    year: 2022,
    status: '',
    anime: '',
    cate: '',
    author: '',
    tags: [],
    sort: '发行',
    collected: ''
  },
  data: LIST_EMPTY,
  layout: 'list',
  expand: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}

export const ADVANCE_LIMIT = 60

// 类型分组
const WENKU_TAGS_GROUP = [[], []]
WENKU_TAGS.forEach((item, index) => WENKU_TAGS_GROUP[index % 2 ? 1 : 0].push(item))

export const filterDS = [
  {
    title: '首字',
    type: 'first',
    data: WENKU_FIRST
  },
  {
    title: '发行',
    type: 'year',
    data: WENKU_YEAR,
    always: true
  },
  {
    title: '状态',
    type: 'status',
    data: WENKU_STATUS
  },
  {
    title: '动画',
    type: 'anime',
    data: WENKU_ANIME
  },
  {
    title: '出版',
    type: 'cate',
    data: WENKU_CATE
  },
  {
    title: '作者',
    type: 'author',
    data: WENKU_AUTHOR
  },
  {
    title: '分类',
    type: 'tags',
    data: WENKU_TAGS_GROUP,
    multiple: true,
    multiSelect: true,
    // nums: WENKU_TAGS_NUMS_MAP,
    always: true
  },
  {
    title: '排序',
    type: 'sort',
    data: WENKU_SORT,
    always: true
  },
  {
    title: '收藏',
    type: 'collected',
    data: WENKU_COLLECTED
  }
] as const

export const HM = ['wenku', 'Wenku'] as const
