/*
 * @Author: czy0729
 * @Date: 2024-07-20 09:31:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:21:11
 */
import { groupItems } from '@_'
import { NSFW_COLLECTED, NSFW_SORT, NSFW_TAGS, NSFW_TYPE, NSFW_YEAR } from '@utils/subject/nsfw'

export const COMPONENT = 'NSFW'

export const ADVANCE_LIMIT = 60

/** 标签三行分组 (横向滚动, 三行同显, 同其他频道的 TAG_GROUP) */
const NSFW_TAG_GROUP = groupItems(NSFW_TAGS)

/** 筛选行顺序统一见 web/standalone/DIMENSIONS.md §一.8 */
export const filterDS = [
  {
    title: '年份',
    type: 'year',
    data: NSFW_YEAR,
    always: true
  },
  {
    title: '类型',
    type: 'type',
    data: NSFW_TYPE,
    always: true
  },
  {
    title: '标签',
    type: 'tag',
    data: NSFW_TAG_GROUP,
    multiple: true
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
