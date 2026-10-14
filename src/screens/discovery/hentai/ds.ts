/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:07:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 页面常量: 筛选维度与分组
 */
import { groupItems } from '@_'
import {
  HENTAI_BODY,
  HENTAI_CHARA,
  HENTAI_COLLECTED,
  HENTAI_CONTENT,
  HENTAI_JOB,
  HENTAI_SORT,
  HENTAI_YEAR
} from '@utils/subject/hentai'

export const COMPONENT = 'Hentai'

export const ADVANCE_LIMIT = 60

/** 剧情两行分组 (横向滚动, 两行同显) */
const HENTAI_CONTENT_GROUP = groupItems(HENTAI_CONTENT, 2)

export const filterDS = [
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
