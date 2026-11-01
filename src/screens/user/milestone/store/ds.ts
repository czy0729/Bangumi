/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:54:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 06:25:58
 *
 * 照片墙页面 Store 状态与常量
 */
import { COLLECTION_STATUS, COLLECTIONS_ORDERBY, SUBJECT_TYPE } from '@constants'
import { COMPONENT } from '../ds'

import type { CollectionsOrder, CollectionStatus, Loaded, SubjectType } from '@types'
import type { SubTitle } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  /** 是否显示设置面板 */
  show: false,

  /** 是否请求中 */
  fetching: false
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 条目类型 */
  subjectType: SUBJECT_TYPE[0].label as SubjectType,

  /** 收藏类型 */
  type: COLLECTION_STATUS[1].value as CollectionStatus,

  /** 排序方式 */
  order: COLLECTIONS_ORDERBY[0].value as CollectionsOrder,

  /** 标签筛选 */
  tag: '',

  /** 评分筛选 */
  score: '全部',

  /** 是否固定头部 */
  fixedHeader: true,

  /** 是否显示用户信息区 */
  userInfo: false,

  /** 是否显示渐变背景 */
  bg: true,

  /** 列数 */
  numColumns: 4,

  /** 封面是否圆角 */
  radius: false,

  /** 封面是否自适应高度 */
  autoHeight: false,

  /** 标题是否中文优先 */
  cnFirst: true,

  /** 标题行数, 0 为不显示 */
  numberOfLines: 2,

  /** 标题字号是否自适应 */
  titleAutoSize: false,

  /** 第二行显示内容 */
  subTitle: '序号' as SubTitle,

  /** 第三行显示内容 */
  extraTitle: '无' as SubTitle,

  /** 是否显示完整评分星星 */
  starsFull: false,

  /** 评分星星是否着色 */
  starsColor: true,

  /** 是否显示 NSFW 内容 */
  nsfw: true,

  /** 收藏时间是否换算为相对时间 */
  lastTime: false,

  /** 显示条目数上限, 0 为不限 */
  limit: 100,

  /** 是否倒序 */
  reverse: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
