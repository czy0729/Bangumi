/*
 * @Author: czy0729
 * @Date: 2022-09-03 05:05:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-10 04:05:43
 *
 * 超展开页状态与常量
 */
import { _ } from '@stores'
import {
  MODEL_RAKUEN_SCOPE,
  MODEL_RAKUEN_TYPE_GROUP,
  MODEL_RAKUEN_TYPE_MONO,
  MODEL_RAKUEN_TYPE_SUBJECT,
  WEB
} from '@constants'
import { COMPONENT } from '../ds'

import type { Rakuen } from '@stores/rakuen/types'
import type {
  Loaded,
  RakuenScope,
  RakuenTypeGroup,
  RakuenTypeMono,
  RakuenTypeSubject
} from '@types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const INIT_PREFETCH_STATE = {
  /** 是否正在预读取 */
  prefetching: false,

  /** 预读取总数 */
  prefetchTotal: 0,

  /** 已预读取数量 */
  prefetchCurrent: 0
}

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

/** 条目下我回复过的讨论 */
export type SubjectReplies = Rakuen & {
  /** 缓存所属账号 */
  _userId?: string | number

  /** 上次请求是否失败 */
  _error?: boolean
}

export const INIT_SUBJECT_REPLIES: SubjectReplies = {
  list: [],
  pagination: {
    page: 1,
    pageTotal: 1
  },
  _loaded: false
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 首批之外条目是否已延迟挂载 */
  _mounted: WEB
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 超展开板块 */
  scope: MODEL_RAKUEN_SCOPE.getValue<RakuenScope>('全局聚合'),

  /** Tabs 当前页数 */
  page: 1,

  /** 小组范围 */
  group: MODEL_RAKUEN_TYPE_GROUP.getValue<RakuenTypeGroup>('全部'),

  /** 条目范围 */
  subject: MODEL_RAKUEN_TYPE_SUBJECT.getValue<RakuenTypeSubject>('全部'),

  /** 人物类型 */
  mono: MODEL_RAKUEN_TYPE_MONO.getValue<RakuenTypeMono>('全部'),

  /** 条目下我回复过的讨论 */
  subjectReplies: INIT_SUBJECT_REPLIES,

  /** Prefetch */
  ...INIT_PREFETCH_STATE,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}

/** 延迟加载标记的延时 */
export const DELAY_MOUNTED = 80

/** 刷新到顶时的列表偏移 */
export const VIEW_OFFSET_TOP = 8000
