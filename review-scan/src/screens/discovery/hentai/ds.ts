/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:07:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:24:46
 */
import {
  HENTAI_BODY,
  HENTAI_CHARA,
  HENTAI_COLLECTED,
  HENTAI_CONTENT,
  HENTAI_FIRST,
  HENTAI_JOB,
  HENTAI_SORT,
  HENTAI_YEAR
} from '@utils/subject/hentai'
import { LIST_EMPTY } from '@constants'
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenHentai'

export const STATE = {
  query: {
    first: '',
    year: 2022,
    chara: '',
    job: '',
    body: '',
    content: '',
    sort: '评分人数',
    collected: ''
  },
  data: LIST_EMPTY,
  layout: 'list',
  expand: false,
  _loaded: false as Loaded
}

export const ADVANCE_LIMIT = 60

// 类型分组
const HENTAI_CONTENT_GROUP = [[], []]
HENTAI_CONTENT.forEach((item, index) => HENTAI_CONTENT_GROUP[index % 2 ? 1 : 0].push(item))

export const filterDS = [
  {
    title: '首字',
    type: 'first',
    data: HENTAI_FIRST
  },
  {
    title: '年份',
    type: 'year',
    data: HENTAI_YEAR,
    always: true
  },
  {
    title: '人物',
    type: 'chara',
    data: HENTAI_CHARA,
    login: true
  },
  {
    title: '职业',
    type: 'job',
    data: HENTAI_JOB,
    login: true
  },
  {
    title: '外貌',
    type: 'body',
    data: HENTAI_BODY,
    login: true
  },
  {
    title: '剧情',
    type: 'content',
    data: HENTAI_CONTENT_GROUP,
    multiple: true,
    login: true
  },
  {
    title: '排序',
    type: 'sort',
    data: HENTAI_SORT,
    always: true
  },
  {
    title: '收藏',
    type: 'collected',
    data: HENTAI_COLLECTED
  }
] as const

export const HM = ['hentai', 'Hentai'] as const
