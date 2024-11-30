/*
 * @Author: czy0729
 * @Date: 2022-08-28 00:38:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 19:40:40
 */
import { RANK_ANIME_FILTER } from '@constants'

export const COMPONENT = 'Series'

export const DATA_SORT = ['默认', '关联数', '新放送', '评分'] as const

export const DATA_FILTER = RANK_ANIME_FILTER.map(item => item.label)

export const DATA_STATUS = ['全部', '有关联系列', '未收藏', '看过', '在看', '未看完'] as const

export const HOST_API_V0 = 'https://api.bgm.tv/v0'

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

export const SUBJECT_ITEM = {
  id: 0,
  name: '',
  name_cn: '',
  image: '',
  date: '',
  total_episodes: 0,
  platform: '',
  rank: 0,
  score: 0,
  total: 0,
  _loaded: 0
} as const

export const LIMIT = 100

export const DISTANCE = 60 * 60 * 24
