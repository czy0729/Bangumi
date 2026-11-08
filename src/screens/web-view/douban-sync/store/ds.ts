/*
 * @Author: czy0729
 * @Date: 2022-10-17 00:00:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 20:30:00
 *
 * 页面状态与常量
 */
import { COMPONENT } from '../ds'

import type { Id, Loaded, SubjectId } from '@types'
import type { CollectionInfo, StateData } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  progress: {
    fetching: false,
    message: '',
    current: 0,
    total: 0
  },

  /** 窗口默认收起, 启动时不恢复上次状态, 因此不持久化 */
  hide: true
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 用户地址或 Id */
  doubanId: '',

  /** 追番记录 (douban) */
  data: {
    list: [],
    _loaded: 0
  } as StateData,

  /** 收藏信息 (bgm) */
  collections: {} as Record<SubjectId, CollectionInfo>,

  /** 补充条目的总集数 (bgm) */
  totalEps: {} as Record<SubjectId, number>,

  /** 置底数据 */
  bottom: {
    current: 0
  } as { current: number } & Partial<Record<Id, number>>,

  /** 隐藏看过的条目 */
  hideWatched: false,

  /** 隐藏相同收藏的条目 */
  hideSame: false,

  /** 隐藏未匹配的条目 */
  hideNotMatched: false,

  /** 创建时间作为评论 */
  noCommentUseCreateDate: false,

  /** 评分 -1 */
  scoreMinuesOne: false,

  /** 收藏是否可见 */
  privacy: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
