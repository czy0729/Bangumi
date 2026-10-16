/*
 * @Author: czy0729
 * @Date: 2024-11-30 17:32:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 19:53:28
 *
 * 关联系列状态: 收藏数据 / 关联关系与延迟常量
 */
import { _ } from '@stores'
import { COMPONENT } from '../ds'

import type { Loaded, SubjectId } from '@types'
import type { CollectionItem, SubjectItem } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

/** 二级关系请求延迟 */
export const SUB_RELATIONS_DELAY = 1600

/** 其他收藏状态请求延迟 */
export const OTHER_COLLECTIONS_DELAY = 4000

/** 请求中状态清理延迟 */
export const CLEAR_STATE_DELAY = 1600

/** 请求进度通知节流间隔 (毫秒) */
export const PROGRESS_INTERVAL = 200

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 请求中 */
  fetching: false,

  /** 请求进度文案 */
  message: '',

  /** 请求进度当前值 */
  current: 0,

  /** 请求进度总数 */
  total: 0,

  /** 已展开子条目的系列组 */
  expand: [] as SubjectId[]
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 在看与看过的收藏 */
  collections: [] as CollectionItem[],

  /** 想看、搁置与抛弃的收藏 */
  otherCollections: [] as CollectionItem[],

  /** 条目关联关系 */
  relations: {} as Record<SubjectId, SubjectId[]>,

  /** 条目信息 */
  subjects: {} as Record<SubjectId, SubjectItem>,

  /** 系列分组 */
  data: [] as SubjectId[][],

  /** 排序 */
  sort: '',

  /** 类型 */
  filter: '',

  /** 年 */
  airtime: '',

  /** 状态 */
  status: '',

  /** 是否锁定工具栏 */
  fixed: true,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
