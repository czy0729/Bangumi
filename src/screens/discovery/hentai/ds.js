/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:07:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-02 08:50:06
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
    data: HENTAI_CONTENT,
    login: true
  },
  {
    title: '排序',
    type: 'sort',
    data: HENTAI_SORT,
    always: true
  }
]
