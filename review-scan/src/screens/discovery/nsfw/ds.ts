/*
 * @Author: czy0729
 * @Date: 2024-07-20 09:31:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:21:11
 */
import { NSFW_COLLECTED, NSFW_SORT, NSFW_TYPE, NSFW_YEAR } from '@utils/subject/nsfw'

export const COMPONENT = 'NSFW'

export const ADVANCE_LIMIT = 60

export const filterDS = [
  {
    title: '类型',
    type: 'type',
    data: NSFW_TYPE,
    always: true
  },
  {
    title: '年份',
    type: 'year',
    data: NSFW_YEAR,
    always: true
  },
  {
    title: '排序',
    type: 'sort',
    data: NSFW_SORT,
    always: true
  },
  {
    title: '收藏',
    type: 'collected',
    data: NSFW_COLLECTED
  }
] as const

export const HM = ['nsfw', 'NSFW'] as const
