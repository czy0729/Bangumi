/*
 * @Author: czy0729
 * @Date: 2022-08-28 00:38:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 19:40:40
 *
 * 关联系列页面常量
 */
import { RANK_ANIME_FILTER } from '@constants'

import type { SubjectItem } from './types'

export const COMPONENT = 'Series'

/** 排序模式: 默认 (保持分组原始顺序) */
export const SORT_DEFAULT = '默认'

/** 排序模式: 关联数 (多到少) */
export const SORT_RELATIONS = '关联数'

/** 排序模式: 新放送 (新到旧) */
export const SORT_AIRTIME = '新放送'

/** 排序模式: 评分 (排名靠前在前) */
export const SORT_SCORE = '评分'

export const DATA_SORT = [SORT_DEFAULT, SORT_RELATIONS, SORT_AIRTIME, SORT_SCORE] as const

export const DATA_FILTER = RANK_ANIME_FILTER.map(item => item.label)

export const DATA_STATUS = ['全部', '有关联系列', '未收藏', '看过', '在看', '未看完'] as const

export const RELATIONS = [
  '前传',
  '续集',
  '番外篇',
  '主线故事',
  '相同世界观',
  '不同世界观'
  // '衍生',
  // '角色出演',
  // '不同演绎',
  // '三次元'
] as const

export const SUBJECT_TYPE = 2

/** 条目信息占位 */
export const SUBJECT_ITEM: SubjectItem = {
  id: '',
  name: '',
  name_cn: '',
  image: '',
  date: '',
  eps: 0,
  total_episodes: 0,
  platform: '',
  rank: 0,
  score: 0,
  total: 0,
  _loaded: 0
}

export const LIMIT = 100

/** 预先加载条目信息的数量上限 */
export const SOME_SUBJECTS_LIMIT = 200

export const DISTANCE = 60 * 60 * 24
