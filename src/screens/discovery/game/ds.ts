/*
 * @Author: czy0729
 * @Date: 2021-06-26 06:43:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-18 21:33:17
 */
import {
  GAME_CATE,
  GAME_COLLECTED,
  GAME_DEV,
  GAME_FIRST,
  GAME_PLATFORM,
  GAME_PUB,
  GAME_SORT,
  GAME_YEAR
} from '@utils/subject/game'
import { LIST_EMPTY } from '@constants'
import { Loaded } from '@types'

export const COMPONENT = 'Game'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  query: {
    first: '',
    year: 2023,
    platform: '',
    cate: '',
    dev: '',
    pub: '',
    sort: '发行',
    collected: ''
  },
  data: LIST_EMPTY,
  layout: 'list',
  expand: false,
  _loaded: false as Loaded
}

export const ADVANCE_LIMIT = 100

// 类型分组
const GAME_CATE_GROUP = [[], []]
GAME_CATE.forEach((item, index) => GAME_CATE_GROUP[index % 2 ? 1 : 0].push(item))

// 开发商分组
const GAME_DEV_GROUP = [[], []]
GAME_DEV.forEach((item, index) => GAME_DEV_GROUP[index % 2 ? 1 : 0].push(item))

// 发行商分组
const GAME_PUB_GROUP = [[], []]
GAME_PUB.forEach((item, index) => GAME_PUB_GROUP[index % 2 ? 1 : 0].push(item))

export const filterDS = [
  {
    title: '首字　',
    type: 'first',
    data: GAME_FIRST
  },
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
    title: '排序　',
    type: 'sort',
    data: GAME_SORT,
    always: true
  },
  {
    title: '收藏',
    type: 'collected',
    data: GAME_COLLECTED
  }
] as const

export const advFilterDS = [
  {
    title: '首字　',
    type: 'first',
    data: GAME_FIRST
  },
  {
    title: '发行　',
    type: 'year',
    data: GAME_YEAR,
    always: true
  },
  {
    title: '类型　',
    type: 'cate',
    data: GAME_CATE_GROUP,
    multiple: true,
    always: true
  },
  {
    title: '开发商',
    type: 'dev',
    data: GAME_DEV_GROUP,
    multiple: true
  },
  {
    title: '发行商',
    type: 'dev',
    data: GAME_PUB_GROUP,
    multiple: true
  },
  {
    title: '排序　',
    type: 'sort',
    data: GAME_SORT,
    always: true
  },
  {
    title: '收藏',
    type: 'collected',
    data: GAME_COLLECTED
  }
] as const
