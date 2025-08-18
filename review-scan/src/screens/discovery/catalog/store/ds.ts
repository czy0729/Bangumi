/*
 * @Author: czy0729
 * @Date: 2023-12-17 08:17:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-29 14:11:38
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { COMPONENT, FILTER_KEY_DS, FILTER_TYPE_DS, FILTER_YEAR_DS, TYPE_DS } from '../ds'
import { FilterKey, FilterType, FilterYear, TypeType } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 是否加载 catalog */
  loadedCatalog: false
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 列表类型 */
  type: TYPE_DS[0].key as TypeType,
  page: 1,
  show: true,
  ipt: '1',

  /** 筛选条目类型 */
  filterType: FILTER_TYPE_DS[0] as FilterType,

  /** 筛选时间 */
  filterYear: FILTER_YEAR_DS[1] as FilterYear,

  /** 筛选热词 */
  filterKey: FILTER_KEY_DS[0][0] as FilterKey,

  /** 是否锁定筛选 */
  fixedFilter: true,

  /** 是否锁定分页器 */
  fixedPagination: true,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
