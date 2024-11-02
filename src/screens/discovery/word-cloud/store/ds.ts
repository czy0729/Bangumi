/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:05:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-03 07:05:06
 */
import { Loaded, SubjectId, SubjectType, UserId } from '@types'
import { COMPONENT } from '../ds'
import { CutList, CutType, SnapshotSubjectsItem } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  title: '',
  show: false,
  fetching: 0,
  fetchingCollections: false
}

export const STATE = {
  data: {
    list: [] as CutList,
    _loaded: 0 as Loaded
  },

  subjects: {} as Record<SubjectId, SnapshotSubjectsItem>,
  subjectType: 'anime' as SubjectType,
  cutType: '制作人员' as CutType,
  user: {} as Record<
    UserId,
    {
      list: CutList
      _loaded: Loaded
    }
  >,

  trend: 0,

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}

/** 排除掉一些无意义的谓词 (视使用情况持续更新) */
export const FILTER_WORD = ['一部', '实在', '感觉', '有点', '有种', '比较', '确实']

/** 排除掉一些无意义的条目标签 */
export const FILTER_TAGS = ['TV', '日本']

export const FILTER_CV = ['主角', '配角', '客串']
