/*
 * @Author: czy0729
 * @Date: 2022-11-11 05:08:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 05:43:28
 */
export const NAMESPACE = 'ScreenTinygrailSacrifice'

export const INIT_LAST_AUCTION = {
  price: '',
  amount: '',
  time: 0
}

export const INIT_LAST_SACRIFICE = {
  amount: '',
  total: '',
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
  auctionPrice: 0,
  starForcesValue: 0,
  loading: false
}

export const STATE = {
  /** 显示封面 */
  showCover: true,

  /** 显示记录 */
  showLogs: true,

  /** 显示圣殿 */
  showTemples: true,

  /** 显示董事会 */
  showUsers: true,

  /** 显示献祭模块 */
  showSacrifice: true,

  /** 显示星之力模块 */
  showStarForces: true,

  /** 显示竞拍模块 */
  showAuction: true,

  /** 显示道具模块 */
  showItems: true,

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
  lastSacrifice: INIT_LAST_SACRIFICE
}
