/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:07:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-27 09:30:15
 */
import {
  ANIME_FIRST,
  ANIME_YEAR,
  ANIME_HENTAI_CHARA,
  ANIME_HENTAI_JOB,
  ANIME_HENTAI_BODY,
  ANIME_HENTAI_CONTENT,
  ANIME_SORT
} from '@utils/anime'

export const filterDS = [
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
    title: '人物',
    type: 'tags|chara',
    data: ANIME_HENTAI_CHARA
  },
  {
    title: '职业',
    type: 'tags|job',
    data: ANIME_HENTAI_JOB
  },
  {
    title: '外貌',
    type: 'tags|body',
    data: ANIME_HENTAI_BODY
  },
  {
    title: '剧情',
    type: 'tags|content',
    data: ANIME_HENTAI_CONTENT
  },
  {
    title: '排序',
    type: 'sort',
    data: ANIME_SORT,
    always: true
  }
]
