/*
 * @Author: czy0729
 * @Date: 2023-12-17 08:17:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 15:39:09
 */
import { Loaded } from '@types'
import { TypeType } from './types'

export const COMPONENT = 'Catalog'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  /** 是否加载 catalog */
  loadedCatalog: false
}

export const STATE = {
  type: 'advance' as TypeType,
  page: 1,
  show: true,
  ipt: '1',

  /** 筛选类型 */
  filterType: '不限',

  /** 筛选时间 */
  filterYear: '近1年',

  /** 筛选热词 */
  filterKey: '不限',

  /** 是否锁定筛选 */
  fixedFilter: false,

  /** 是否锁定分页器 */
  fixedPagination: false,
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
