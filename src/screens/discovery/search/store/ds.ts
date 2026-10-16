/*
 * @Author: czy0729
 * @Date: 2022-07-30 12:47:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-21 16:31:01
 *
 * 搜索状态: 历史 / 搜索类型 / 输入框 与延迟常量
 */
import { _ } from '@stores'
import { MODEL_SEARCH_CAT, MODEL_SEARCH_LEGACY } from '@constants'
import { COMPONENT } from '../ds'

import type { Loaded, RatingStatus, SearchCat, SearchLegacy, SubjectActions } from '@types'

export const NAMESPACE = `Screen${COMPONENT}`

/** 初始参数处理延迟 */
export const INIT_STATE_DELAY = 40

/** 提交前等待输入值同步的延迟 */
export const SUBMIT_DELAY = 400

/** 提交后发起搜索的延迟 */
export const SEARCH_DELAY = 800

/** 收藏状态查询延迟 */
export const COLLECTION_QUEUE_DELAY = 160

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 输入框值 */
  _value: '',

  /** 确认的输入框值 */
  value: '',

  /** 输入框聚焦中 */
  focus: false,

  /** 查询搜索中 */
  searching: false,

  /** 收藏管理框 */
  modal: {
    visible: false,
    subjectId: 0,
    title: '',
    desc: '',
    status: '' as '' | RatingStatus,
    action: '听' as SubjectActions
  }
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 搜索历史 */
  history: [] as string[],

  /** 列表 */
  cat: MODEL_SEARCH_CAT.getValue<SearchCat>('动画'),

  /** 是否精准查询 */
  legacy: MODEL_SEARCH_LEGACY.getValue<SearchLegacy>('模糊'),

  /** 繁体设置打开时, 是否将输入框内容转成简体 */
  t2s: true,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
