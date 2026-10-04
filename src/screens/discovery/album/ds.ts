/*
 * @Author: czy0729
 * @Date: 2026-10-05 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 */
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
const ALBUM_TAG_GROUP = [[], [], []]
ALBUM_TAGS.forEach((item, index) => ALBUM_TAG_GROUP[index % 3].push(item))

/** 出版社两行分组 */
const ALBUM_PUBLISHER_GROUP = [[], []]
ALBUM_PUBLISHERS.forEach((item, index) => ALBUM_PUBLISHER_GROUP[index % 2].push(item))

/** 作者两行分组 */
const ALBUM_AUTHOR_GROUP = [[], []]
ALBUM_AUTHORS.forEach((item, index) => ALBUM_AUTHOR_GROUP[index % 2].push(item))

export const filterDS = [
  {
    title: '标签',
    type: 'tag',
    data: ALBUM_TAG_GROUP,
    multiple: true
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
    title: '作者',
    type: 'author',
    data: ALBUM_AUTHOR_GROUP,
    multiple: true
  },
  {
    title: '年份',
    type: 'year',
    data: ALBUM_YEAR,
    always: true
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
