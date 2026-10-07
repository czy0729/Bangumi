/*
 * @Author: czy0729
 * @Date: 2026-10-05 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 */
import { groupItems } from '@_'
import {
  ALBUM_AUTHORS,
  ALBUM_CATES,
  ALBUM_COLLECTED,
  ALBUM_NSFW,
  ALBUM_PUBLISHERS,
  ALBUM_SORT,
  ALBUM_TAGS,
  ALBUM_YEAR
} from '@utils/subject/album'

export const COMPONENT = 'Album'

export const ADVANCE_LIMIT = 60

/** 标签三行分组 (横向滚动, 三行同显, 同其他频道的 TAG_GROUP) */
const ALBUM_TAG_GROUP = groupItems(ALBUM_TAGS)

/** 出版社两行分组 */
const ALBUM_PUBLISHER_GROUP = groupItems(ALBUM_PUBLISHERS, 2)

/** 作者两行分组 */
const ALBUM_AUTHOR_GROUP = groupItems(ALBUM_AUTHORS, 2)

/** 筛选行顺序统一见 web/standalone/DIMENSIONS.md §一.8 */
export const filterDS = [
  {
    title: '年份',
    type: 'year',
    data: ALBUM_YEAR,
    always: true
  },
  {
    title: '出版',
    type: 'publisher',
    data: ALBUM_PUBLISHER_GROUP,
    multiple: true
  },
  {
    title: '文库',
    type: 'cate',
    data: ALBUM_CATES
  },
  {
    title: '标签',
    type: 'tag',
    data: ALBUM_TAG_GROUP,
    multiple: true
  },
  {
    title: '作者',
    type: 'author',
    data: ALBUM_AUTHOR_GROUP,
    multiple: true
  },
  {
    title: '分级',
    type: 'x',
    data: ALBUM_NSFW
  },
  {
    title: '排序',
    type: 'sort',
    data: ALBUM_SORT,
    always: true
  },
  {
    title: '收藏',
    type: 'collected',
    data: ALBUM_COLLECTED
  }
] as const

export const HM = ['album', 'Album'] as const
