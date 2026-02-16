/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:05:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-03 07:05:06
 */
import { _ } from '@stores'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatusValue, Loaded, SubjectId, SubjectType, UserId } from '@types'
import { COMPONENT } from '../ds'
import { CollectionsV0Item, CutList, CutType, SnapshotSubjectsItem } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: Math.floor(_.window.height * 0.75)
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** ActionSheet 标题 */
  title: '',

  /** ActionSheet 是否显示 */
  show: false,

  /** 请求中步骤第几步 */
  fetching: 0,

  /** 请求收藏中 */
  fetchingCollections: false
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 分词数据, 独立空间 */
  data: {
    list: [] as CutList,
    _loaded: 0 as Loaded
  },

  /** 用户收藏 */
  collections: {} as Record<`${UserId}|${SubjectType}`, CollectionsV0Item[]>,

  /** 条目快照 */
  subjects: {} as Record<SubjectId, SnapshotSubjectsItem>,

  /** 条目类型 */
  subjectType: 'anime' as SubjectType,

  /** 收藏年份 */
  year: '',

  /** 条目分词类型 */
  cutType: '制作人员' as CutType,

  /** 条目分词二级类型 */
  subCutType: '',

  /** 条目分词数据, 通用空间 */
  user: {} as Record<
    UserId,
    {
      list: CutList
      _loaded: Loaded
    }
  >,

  /** 趋势 */
  trend: 0,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}

/** 获取用户收藏配置 */
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
  }
] as const

/** 排除掉一些无意义的谓词 (视使用情况持续更新) */
export const FILTER_WORD = ['一部', '实在', '感觉', '有点', '有种', '比较', '确实']

/** 排除掉一些无意义的条目标签 */
export const FILTER_TAGS = ['TV', '日本']

export const FILTER_CV = ['主角', '配角', '客串']
