/*
 * @Author: czy0729
 * @Date: 2024-02-28 04:30:04
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-02-28 04:30:04
 */
import { rc } from '@utils/dev'
import {
  DATA_ANIME_AREA,
  DATA_ANIME_TAG,
  DATA_ANIME_TARGET,
  DATA_CLASSIFICATION as DATA_GAME_CLASSIFICATION,
  DATA_GAME_TAG,
  DATA_GAME_TARGET,
  DATA_REAL_AREA,
  DATA_SOURCE as DATA_ANIME_SOURCE,
  DATA_THEME as DATA_REAL_THEME,
  MODEL_RANK_ANIME_FILTER,
  MODEL_RANK_BOOK_FILTER,
  MODEL_RANK_BOOK_FILTER_SUB,
  MODEL_RANK_GAME_FILTER,
  MODEL_RANK_GAME_FILTER_SUB,
  MODEL_RANK_REAL_FILTER,
  SUBJECT_TYPE,
  TAG_ORDERBY
} from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ToolBar')

/** 地区 */
export const DATA_AREA = {
  动画: DATA_ANIME_AREA,
  三次元: DATA_REAL_AREA
} as const

/** 分级 */
export const DATA_CLASSIFICATION = {
  游戏: DATA_GAME_CLASSIFICATION
} as const

/** 二级分类 */
export const DATA_FILTER_SUB = {
  书籍: MODEL_RANK_BOOK_FILTER_SUB,
  游戏: MODEL_RANK_GAME_FILTER_SUB
} as const

/** 二级分类 (文案) */
export const TEXT_FILTER_SUB = {
  书籍: '系列',
  游戏: '平台'
} as const

/** 一级分类 */
export const DATA_FILTER = {
  动画: MODEL_RANK_ANIME_FILTER,
  书籍: MODEL_RANK_BOOK_FILTER,
  游戏: MODEL_RANK_GAME_FILTER,
  三次元: MODEL_RANK_REAL_FILTER
} as const

/** 排序 */
export const DATA_SORT = TAG_ORDERBY.map(item => item.label)

/** 来源 */
export const DATA_SOURCE = {
  动画: DATA_ANIME_SOURCE
} as const

/** 类型 */
export const DATA_TAG = {
  动画: DATA_ANIME_TAG,
  游戏: DATA_GAME_TAG
} as const

/** 受众 */
export const DATA_TARGET = {
  动画: DATA_ANIME_TARGET,
  游戏: DATA_GAME_TARGET
} as const

/** 题材 */
export const DATA_THEME = {
  三次元: DATA_REAL_THEME
} as const

/** 类型 */
export const DATA_TYPE = SUBJECT_TYPE.map(item => item.title)
