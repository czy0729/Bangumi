/*
 * @Author: czy0729
 * @Date: 2024-07-20 09:31:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-20 10:49:22
 */
import { NSFW_COLLECTED, NSFW_FIRST, NSFW_SORT, NSFW_YEAR } from '@utils/subject/nsfw'

export const COMPONENT = 'NSFW'

export const ADVANCE_LIMIT = 40

export const filterDS = [
  {
    title: '首字',
    type: 'first',
    data: NSFW_FIRST
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
