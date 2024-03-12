/*
 * @Author: czy0729
 * @Date: 2022-11-11 05:08:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 18:05:01
 */
import { Loaded } from '@types'

export const COMPONENT = 'TinygrailSacrifice'

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
  loadingRefine: false
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

  ...EXCLUDE_STATE,

  /** 角色独立 */
  lastAuction: INIT_LAST_AUCTION,

  /** 角色独立 */
  lastSacrifice: INIT_LAST_SACRIFICE,

  /** 精炼二次确认 */
  confirmRefine: true,

  _loaded: 0 as Loaded
}
