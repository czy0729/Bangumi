/*
 * @Author: czy0729
 * @Date: 2022-07-26 04:31:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-01 21:52:50
 */
import { _ } from '@stores'
import { COMPONENT, LAYOUT_DS, TYPE_DS } from '../ds'

import type { Loaded } from '@types'

export const NAMESPACE = `Screen${COMPONENT}`

/** 判定「换季后放送数据缺失」所需的总条目数下限, 避免数据异常时误判 */
export const AIR_TIME_MISSING_MIN_COUNT = 20

/** 判定「换季后放送数据缺失」所需的未知时间条目数下限 */
export const AIR_TIME_MISSING_MIN_UNKNOWN = 30

/** 未知时间条目占比达到该比例视为放送数据缺失 (正常数据源覆盖率远高于此) */
export const AIR_TIME_MISSING_RATIO = 0.5

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 改编 */
  adapt: '',

  /** 标签 */
  tag: '',

  /** 动画制作 */
  origin: '',

  /** 是否加载 bangumi-data */
  loadedBangumiData: false
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 布局 */
  layout: LAYOUT_DS[0].key as (typeof LAYOUT_DS)[number]['key'],

  /** 筛选 */
  type: TYPE_DS[0].key as (typeof TYPE_DS)[number]['key'],

  /** 是否展开所有 */
  expand: false,

  /** 上次请求全局管理单独条目的收藏状态 */
  _lastQueue: 0 as number,

  /** 上次提示换季放送数据缺失的时间戳, 用于防打扰 */
  _airTimeTiped: 0 as number,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
