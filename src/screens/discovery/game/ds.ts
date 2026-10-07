/*
 * @Author: czy0729
 * @Date: 2021-06-26 06:43:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-14 17:08:28
 */
import { groupItems } from '@_'
import {
  GAME_CATE,
  GAME_COLLECTED,
  GAME_DEV,
  GAME_JUNK,
  GAME_NSFW,
  GAME_PLATFORM,
  GAME_PUB,
  GAME_SORT,
  GAME_TAGS,
  GAME_YEAR
} from '@utils/subject/game'

export const COMPONENT = 'Game'

export const ADVANCE_LIMIT = 60

// 类型分组
const GAME_CATE_GROUP = groupItems(GAME_CATE, 2)

// 标签三行分组 (横向滚动, 三行同显, 同 music / adv)
const GAME_TAG_GROUP = groupItems(GAME_TAGS)

// 开发商分组 (数据侧清洗残留的公司后缀不展示, 仍可在 search 命中)
const GAME_DEV_GROUP = groupItems(
  GAME_DEV.filter(item => !GAME_JUNK.includes(item)),
  2
)

// 发行商分组
const GAME_PUB_GROUP = groupItems(
  GAME_PUB.filter(item => !GAME_JUNK.includes(item)),
  2
)

/** 筛选组顺序与找番剧一致: 属性维度在前, 标签居中, 制作维度随后, 收尾固定 */
export const filterDS = [
  {
    title: '发行　',
    type: 'year',
    data: GAME_YEAR,
    always: true
  },
  {
    title: '平台　',
    type: 'platform',
    data: GAME_PLATFORM
  },
  {
    title: '类型　',
    type: 'cate',
    data: GAME_CATE_GROUP,
    multiple: true,
    always: true
  },
  {
    title: '标签',
    type: 'tag',
    data: GAME_TAG_GROUP,
    multiple: true
  },
  {
    title: '开发商',
    type: 'dev',
    data: GAME_DEV_GROUP,
    multiple: true
  },
  {
    title: '发行商',
    type: 'pub',
    data: GAME_PUB_GROUP,
    multiple: true
  },
  {
    title: '分级　',
    type: 'x',
    data: GAME_NSFW
  },
  {
    title: '排序　',
    type: 'sort',
    data: GAME_SORT,
    always: true
  },
  {
    title: '收藏　',
    type: 'collected',
    data: GAME_COLLECTED
  }
] as const
