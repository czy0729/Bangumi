/*
 * @Author: czy0729
 * @Date: 2022-11-11 05:08:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-28 22:38:12
 */
import { Loaded } from '@types'
import { COMPONENT, TEMPLES_SORT_DS, USERS_SORT_DS } from '../ds'
import { TemplesSort, UsersSort } from '../types'

export const NAMESPACE = `Screen${COMPONENT}`

export const INIT_LAST_AUCTION = {
  price: '' as string | number,
  amount: '' as string | number,
  time: 0
}

export const INIT_LAST_SACRIFICE = {
  amount: '' as string | number,
  total: '' as string | number,
  time: 0
}

export const EXCLUDE_STATE = {
  /** 只能是整数 */
  amount: 0,

  /** 股权融资 */
  isSale: false,

  /** 展开所有圣殿 */
  expand: false,
  auctionLoading: false,
  auctionAmount: 0,
  auctionPrice: 0 as string | number,
  starForcesValue: 0,
  loading: false,
  loadingRefine: false,

  /** 当前页面实例是否在路由栈中 */
  mounted: true
}

export const STATE = {
  /** 显示封面 */
  showCover: false,

  /** 显示记录 */
  showLogs: false,

  /** 显示圣殿 */
  showTemples: false,

  /** 显示董事会 */
  showUsers: false,

  /** 显示献祭模块 */
  showSacrifice: false,

  /** 显示星之力模块 */
  showStarForces: false,

  /** 显示竞拍模块 */
  showAuction: false,

  /** 显示精炼模块 */
  showRefine: false,

  /** 显示道具模块 */
  showItems: false,

  /** 通天塔各分段排名需要的献祭数 */
  rankStarForces: {
    20: '',
    40: '',
    60: '',
    80: '',
    100: '',
    200: '',
    300: '',
    400: '',
    500: '',
    _loaded: 0
  },

  /** 角色独立 */
  lastAuction: INIT_LAST_AUCTION,

  /** 角色独立 */
  lastSacrifice: INIT_LAST_SACRIFICE,

  /** 精炼二次确认 */
  confirmRefine: true,

  /** 固定资产排序 */
  templesSort: TEMPLES_SORT_DS[0] as TemplesSort,

  /** 董事会排序 */
  usersSort: USERS_SORT_DS[0] as UsersSort,

  ...EXCLUDE_STATE,
  _loaded: 0 as Loaded
}
