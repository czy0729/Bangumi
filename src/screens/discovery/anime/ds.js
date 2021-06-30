/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:07:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-26 06:11:18
 */
import {
  ANIME_AREA,
  ANIME_TYPE,
  ANIME_FIRST,
  ANIME_YEAR,
  ANIME_BEGIN,
  ANIME_STATUS,
  ANIME_TAGS,
  ANIME_OFFICIAL,
  ANIME_SORT
} from '@utils/subject/anime'

// 类型分组
const ANIME_TAGS_GROUP = []
for (let i = 0, len = ANIME_TAGS.length; i < len; i += 15) {
  ANIME_TAGS_GROUP.push(ANIME_TAGS.slice(i, i + 15))
}
let tag = ANIME_TAGS_GROUP[0].pop()
ANIME_TAGS_GROUP[1] = [tag, ...ANIME_TAGS_GROUP[1]]
tag = ANIME_TAGS_GROUP[1].pop()
ANIME_TAGS_GROUP[2] = [tag, ...ANIME_TAGS_GROUP[2]]

// 制作分组
const ANIME_OFFICIAL_GROUP = []
for (
  let i = 0, len = ANIME_OFFICIAL.length;
  i < len;
  i += parseInt((ANIME_OFFICIAL.length + 1) / 2)
) {
  ANIME_OFFICIAL_GROUP.push(
    ANIME_OFFICIAL.slice(i, i + parseInt((ANIME_OFFICIAL.length + 1) / 2))
  )
}

export const filterDS = [
  {
    title: '地区',
    type: 'area',
    data: ANIME_AREA
  },
  {
    title: '版本',
    type: 'type',
    data: ANIME_TYPE
  },
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
    title: '季度',
    type: 'begin',
    data: ANIME_BEGIN,
    always: true
  },
  {
    title: '状态',
    type: 'status',
    data: ANIME_STATUS
  },
  {
    title: '类型',
    type: 'tags',
    data: ANIME_TAGS_GROUP
  },
  {
    title: '制作',
    type: 'official',
    data: ANIME_OFFICIAL_GROUP
  },
  {
    title: '排序',
    type: 'sort',
    data: ANIME_SORT,
    always: true
  }
]
