/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:07:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-24 22:11:17
 */
import {
  HENTAI_FIRST,
  HENTAI_YEAR,
  HENTAI_CHARA,
  HENTAI_JOB,
  HENTAI_BODY,
  HENTAI_CONTENT,
  HENTAI_SORT
} from '@utils/subject/hentai'

export const ADVANCE_LIMIT = 80

// 类型分组
const HENTAI_CONTENT_GROUP = [[], []]
HENTAI_CONTENT.forEach((item, index) =>
  HENTAI_CONTENT_GROUP[index % 2 ? 1 : 0].push(item)
)

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
  }
] as const
