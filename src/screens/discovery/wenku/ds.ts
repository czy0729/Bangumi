/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 00:00:00
 */
import { groupItems } from '@_'
import {
  WENKU_ANIME,
  WENKU_AUTHORS,
  WENKU_CATES,
  WENKU_COLLECTED,
  WENKU_NSFW,
  WENKU_PUBLISHERS,
  WENKU_SORT,
  WENKU_TAGS,
  WENKU_VOL,
  WENKU_YEAR
} from '@utils/subject/wenku'

export const COMPONENT = 'Wenku'

export const ADVANCE_LIMIT = 60

/** 标签三行分组 (横向滚动, 三行同显, 同 music / real / manga 的 TAG_GROUP) */
const WENKU_TAG_GROUP = groupItems(WENKU_TAGS)

/** 出版社两行分组 */
const WENKU_PUBLISHER_GROUP = groupItems(WENKU_PUBLISHERS, 2)

/** 作者两行分组 */
const WENKU_AUTHOR_GROUP = groupItems(WENKU_AUTHORS, 2)

/** 文库方两行分组 */
const WENKU_CATE_GROUP = groupItems(WENKU_CATES, 2)

/** 筛选行顺序统一见 web/standalone/DIMENSIONS.md §一.8 */
export const filterDS = [
  {
    title: '开始',
    type: 'start',
    data: WENKU_YEAR,
    always: true
  },
  {
    title: '更新',
    type: 'update',
    data: WENKU_YEAR
  },
  {
    title: '结束',
    type: 'end',
    data: WENKU_YEAR
  },
  {
    title: '出版',
    type: 'publisher',
    data: WENKU_PUBLISHER_GROUP,
    multiple: true
  },
  {
    title: '文库',
    type: 'cate',
    data: WENKU_CATE_GROUP,
    multiple: true
  },
  {
    title: '标签',
    type: 'tag',
    data: WENKU_TAG_GROUP,
    multiple: true
  },
  {
    title: '卷数',
    type: 'vol',
    data: WENKU_VOL
  },
  {
    title: '作者',
    type: 'author',
    data: WENKU_AUTHOR_GROUP,
    multiple: true
  },
  {
    title: '动画',
    type: 'anime',
    data: WENKU_ANIME
  },
  {
    title: '分级',
    type: 'x',
    data: WENKU_NSFW
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
