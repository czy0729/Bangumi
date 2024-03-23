/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:42:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-22 06:58:31
 */
import { Loaded, SubjectId, SubjectType, SubjectTypeValue, UserId } from '@types'
import { CollectionsItem, ListItem } from './types'

export const COMPONENT = 'Like'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  fetching: false,
  message: '',
  current: 0,
  total: 0
}

export const STATE = {
  /** 当前类型 */
  type: 'anime' as SubjectType,

  /** 关联到的条目的基本信息 */
  relates: {} as Record<SubjectId, CollectionsItem>,

  /** 列表数据条目的基本信息 */
  list: {
    anime: [],
    book: [],
    game: [],
    music: [],
    real: []
  } as Record<SubjectType, ListItem[]>,

  /** 条目基本信息集合 */
  subjects: {} as Record<
    SubjectId,
    {
      type?: SubjectTypeValue
      rank?: number
      score?: number
      total?: number
      year?: string
      _loaded: Loaded
    }
  >,
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}

export const HOST_API_V0 = 'https://api.bgm.tv/v0'

export const MAX_COLLECT_PAGE = 8

export const LIMIT = 100

export const API_COLLECTIONS = (
  userId: UserId,
  subjectType: SubjectTypeValue,
  type: any,
  offset?: number,
  limit: number = LIMIT
) => {
  let url = `${HOST_API_V0}/users/${userId}/collections?subject_type=${subjectType}&type=${type}&limit=${limit}`
  if (offset) url += `&offset=${offset}`
  return url
}

export const REASONS = [
  '自己评分',
  '收藏状态',
  '条目排名',
  '条目分数',
  '已看集数',
  '自己点评',
  '私密收藏',
  '最近收藏',
  '标签倾向',
  '多次推荐'
] as const

export const REASONS_INFO = [
  '已评分，高分多加分，低分多扣分',
  '想看加分，搁置、抛弃扣分',
  '条目自身高排名加分，低排名扣分',
  '条目自身高分加分，低分扣分',
  '已看过集数多，稍微加分',
  '进行过长评稍微加分',
  '私密收藏加分',
  '最近操作过稍微加分',
  '标签是你倾向打的，越多相对加越多分',
  '被多个条目推荐到相对加分'
] as const
