/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:42:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 16:08:25
 */
import { _ } from '@stores'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatusValue, Loaded, SubjectId, SubjectType, SubjectTypeValue } from '@types'
import { COMPONENT } from '../ds'
import { ListItem, Relates } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 请求中 */
  fetching: false,

  /** 请求中描述信息 */
  message: '',

  /** 请求中当前步骤 */
  current: 0,

  /** 请求中共多少步骤 */
  total: 0,

  /** 用户 ID 自定义值 */
  ipt: ''
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 当前类型 */
  type: 'anime' as SubjectType,

  /** 列表数据条目的基本信息 */
  list: {
    anime: [],
    book: [],
    game: [],
    music: [],
    real: []
  } as Record<SubjectType, ListItem[]>,

  /** 收藏了的条目 ID */
  collectedSubjectIds: {
    anime: [],
    book: [],
    game: [],
    music: [],
    real: []
  } as Record<SubjectType, SubjectId[]>,

  /** 关联到的条目的基本信息 */
  relates: {} as Relates,

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

  /** 条目猜你喜欢快照 */
  snapshotLikes: {} as Record<
    `like_${SubjectId}`,
    {
      list: {
        id: SubjectId
        name: string
        image: string
      }[]
    } | null
  >,

  /** 条目基本信息快照 */
  snapshotSubjects: {} as Record<
    `subject_${SubjectId}`,
    {
      name_cn: string
      image: string
    } | null
  >,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}

export const COLLECTION_STATUS = [
  {
    value: MODEL_COLLECTION_STATUS.getTitle<CollectionStatusValue>('想看'),
    page: 1
  },
  {
    value: MODEL_COLLECTION_STATUS.getTitle<CollectionStatusValue>('在看'),
    page: 1
  },
  {
    value: MODEL_COLLECTION_STATUS.getTitle<CollectionStatusValue>('看过'),
    page: 3
  },
  {
    value: MODEL_COLLECTION_STATUS.getTitle<CollectionStatusValue>('搁置'),
    page: 1
  },
  {
    value: MODEL_COLLECTION_STATUS.getTitle<CollectionStatusValue>('抛弃'),
    page: 1
  }
] as const
