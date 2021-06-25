/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:59:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-26 06:41:49
 */
import {
  MANGA_FIRST,
  MANGA_YEAR,
  MANGA_STATUS,
  MANGA_TAGS,
  MANGA_HD,
  MANGA_SORT
} from '@utils/manga'

// 数组分组并弄好看
const MANGA_TAGS_GROUP = []
for (let i = 0, len = MANGA_TAGS.length; i < len; i += 15) {
  MANGA_TAGS_GROUP.push(MANGA_TAGS.slice(i, i + 15))
}
let tag = MANGA_TAGS_GROUP[0].pop()
MANGA_TAGS_GROUP[1] = [tag, ...MANGA_TAGS_GROUP[1]]
tag = MANGA_TAGS_GROUP[1].pop()
MANGA_TAGS_GROUP[2] = [tag, ...MANGA_TAGS_GROUP[2]]

export const filterDS = [
  {
    title: '首字',
    type: 'first',
    data: MANGA_FIRST
  },
  {
    title: '年份',
    type: 'year',
    data: MANGA_YEAR,
    always: true
  },
  {
    title: '状态',
    type: 'status',
    data: MANGA_STATUS
  },
  {
    title: '类型',
    type: 'tags',
    data: MANGA_TAGS_GROUP
  },
  {
    title: '源头',
    type: 'hd',
    data: MANGA_HD
  },
  {
    title: '排序',
    type: 'sort',
    data: MANGA_SORT,
    always: true
  }
]
