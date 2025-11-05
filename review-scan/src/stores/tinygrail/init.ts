/*
 * @Author: czy0729
 * @Date: 2019-08-24 23:20:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-27 05:33:35
 */
import { LIST_EMPTY } from '@constants'
import { Id, ListEmpty, Loaded } from '@types'
import { TinygrailItemsItem, TinygrailTopWeekHistoryItem, TinygrailTopWeekItem } from './types'

export const NAMESPACE = 'Tinygrail'

export const INIT_CHARACTERS_ITEM = {
  /** 塔可用资产 */
  // assets: 0,

  /** 活股 */
  // state: 0,

  /** 英灵殿数量 */
  amount: 0,

  /** 当前市场卖出数 */
  asks: 0,

  /** 当前市场买入数 */
  bids: 0,

  /** 新番加成 (周) */
  bonus: 0,

  /** 今天成交量 */
  change: 0,

  /** 当前价 */
  current: 0,

  /**  若角色当前是 ICO 状态, 返回 ICO 结束时间 */
  end: '', //

  /** 涨跌幅 */
  fluctuation: 0,

  /** 若角色当前是 ICO 状态, 返回 ICO 的 ID */
  icoId: 0,

  /** 头像 */
  icon: '',

  /** 角色 MonoId */
  id: 0,

  /** 最近交易时间 */
  lastDeal: '',

  /** 最近挂单时间 */
  lastOrder: '',

  /** 角色等级 */
  level: undefined,

  /** 总市值 */
  marketValue: 0,

  /** 人物 ID */
  monoId: 0,

  /** 人物中文名 */
  name: '',

  /** 英灵殿底价 */
  price: 0,

  /** 通天塔等级 */
  rank: 0,

  /** 基本股息 */
  rate: 0,

  /** 通天塔星之力 */
  starForces: 0,

  /** 你转换的星之力 */
  userStarForces: 0,

  /** 通天塔星星 */
  stars: 0,

  /** 发行量 */
  total: 0,

  /** 不详 */
  type: 0,

  /** 若角色当前是 ICO 状态, 返回当前参与 ICO 人数 */
  users: 0,

  /** 献祭数目 */
  sa: 0,

  /** 上市时间 */
  listedDate: '',

  /** 萌王次数 */
  crown: 0,

  /** 条目 ID */
  subjectId: 0,

  /** 条目名 */
  subjectName: '',

  /** 退市 */
  st: 0
} as const

export const INIT_RICH = {
  '1/50': LIST_EMPTY, // INIT_RICH_ITEM
  '2/50': LIST_EMPTY,
  '1/100': LIST_EMPTY
}

export const INIT_RICH_ITEM = {
  avatar: '',
  nickname: '',
  userId: 0,
  assets: 0, // 余额
  total: 0, // 总额
  principal: 0, // 总量
  lastActiveDate: 0, // 最后操作时间
  lastIndex: 0, // 上次排名
  state: 0 // 666 为封禁
}

export const INIT_KLINE_ITEM = {
  id: 0,
  data: [
    // {
    //   time: 0,
    //   begin: 0,
    //   end: 0,
    //   low: 0,
    //   high: 0,
    //   amount: 0,
    //   price: 0
    // }
  ],
  _loaded: 0
}

export const INIT_DEPTH_ITEM = {
  id: 0,
  asks: [],
  bids: [],
  _loaded: 0
}

export const INIT_ASSETS = {
  id: 0, // 当前用户 ID
  balance: 0,
  assets: 0,
  lastIndex: 0,
  _loaded: 0
}

export const INIT_CHARA_ASSETS = {
  id: 0,
  balance: 0,
  lastDate: '',
  characters: [],
  initials: []
}

export const INIT_CHARA_ASSETS_ITEM = {
  id: 0,
  icon: '',
  name: '',
  current: 0,
  state: 0,
  total: 0
}

export const INIT_USER_LOGS = {
  id: 0,
  amount: 0,
  balance: 0,
  askHistory: [], // INIT_USER_LOGS_ITEM
  asks: [],
  bidHistory: [],
  bids: [],
  sacrifices: 0,
  _loaded: 0
}

export const INIT_USER_LOGS_ITEM = {
  id: 0,
  characterId: 0,
  amount: 0,
  price: 0,
  time: ''
}

export const INIT_MY_CHARA_ASSETS = {
  chara: LIST_EMPTY,
  ico: LIST_EMPTY,
  _loaded: 0
}

export const INIT_BALANCE_ITEM = {
  id: 0,
  balance: 0,
  change: 0,
  time: '',
  charaId: 0,
  desc: ''
}

// 我的拍卖
export const INIT_AUCTION_ITEM = {
  id: 0, // 业务id
  monoId: 0, // 角色id
  name: '', // 角色名
  icon: '', // 角色头像
  marketValue: 0, // 市场价
  total: 0, // 发行量
  rate: 0, // 股息
  amount: 0, // 我的拍卖数量
  price: 0, // 我的拍卖价
  state: '', // 状态 | 0拍卖中 | 1成功 | 2失败
  lastOrder: '' // 操作时间
}

// 当前拍卖状态
export const INIT_AUCTION_STATUS = {
  state: 0, // 人数
  type: 0 // 股数
}

export const STATE = {
  /** 授权 cookie */
  cookie: '',

  /** 用户唯一标识 */
  hash: '',

  /** 全局人物数据 */
  characters: {},

  /** 最高市值 */
  mvc: LIST_EMPTY,

  /** 最大涨幅 */
  mrc: LIST_EMPTY,

  /** 最大跌幅 */
  mfc: LIST_EMPTY,

  /** ICO 最多资金 */
  mvi: LIST_EMPTY,

  /** ICO 最高人气 */
  mpi: LIST_EMPTY,

  /** ICO 最近活跃 */
  rai: LIST_EMPTY,

  /** ICO 即将结束 */
  mri: LIST_EMPTY,

  /** 最近活跃 */
  recent: LIST_EMPTY,

  /** 新番市值 */
  tnbc: LIST_EMPTY,

  /** 新番活跃 */
  nbc: LIST_EMPTY,

  /** 最高股息 */
  msrc: LIST_EMPTY,

  /** 精炼排行 */
  refine_temple: LIST_EMPTY,

  /** 番市首富 */
  rich: {
    ...INIT_RICH
  },

  /** K线 */
  kline: {},

  /** 深度图 */
  depth: {},

  /** 用户资产 */
  assets: INIT_ASSETS,

  /** 其他用户资产 */
  userAssets: {},

  /** 用户资产概览信息 */
  charaAssets: {},

  /** 我的挂单和交易记录 */
  userLogs: {},

  /** 我的买单 */
  bid: LIST_EMPTY,

  /** 我的买单映射 <人物 ID, index> */
  bidMap: {} as Record<Id, number>,

  /** 我的卖单 */
  asks: LIST_EMPTY,

  /** 我的卖单映射 <人物 ID, index> */
  asksMap: {} as Record<Id, number>,

  /** 我的持仓 */
  myCharaAssets: INIT_MY_CHARA_ASSETS,

  /** 资金日志 */
  balance: LIST_EMPTY,

  /** 记录所有角色的头像 (用于没有头像的列表) */
  iconsCache: {} as Record<Id, string>,

  /** ICO 参与者 */
  initial: {},

  /** 董事会 */
  users: {},

  /** 角色奖池 */
  charaPool: {},

  /** 用户圣殿 */
  temple: {},

  /** 用户所有角色信息 */
  charaAll: {},

  /** 我的圣殿 */
  myTemple: {},

  /** 角色圣殿 */
  charaTemple: {},

  /** 可拍卖信息 */
  valhallChara: {},

  /** 上周拍卖记录 */
  auctionList: {},

  /** 英灵殿 */
  valhallList: LIST_EMPTY,

  /** 我的道具 */
  items: LIST_EMPTY as ListEmpty<TinygrailItemsItem>,

  /** 我的拍卖 */
  auction: LIST_EMPTY,

  /** 我的拍卖映射 <人物 ID, index> */
  auctionMap: {} as Record<Id, number>,

  /** 当前拍卖状态 */
  auctionStatus: {},

  /** 角色发行价 */
  issuePrice: {},

  /** 最近圣殿 */
  templeLast: LIST_EMPTY,

  /** 每周萌王 */
  topWeek: LIST_EMPTY as ListEmpty<TinygrailTopWeekItem>,

  /** 历史萌王 */
  topWeekHistory: {} as Record<number, ListEmpty<TinygrailTopWeekHistoryItem>>,

  /** 检测用户有多少圣殿 */
  templeTotal: {},

  /** 检测用户有多少角色 */
  charaTotal: {},

  /** 卖一推荐 */
  advanceList: LIST_EMPTY,

  /** 买一推荐 */
  advanceBidList: LIST_EMPTY,

  /** 竞拍推荐 */
  advanceAuctionList: LIST_EMPTY,

  /** 竞拍推荐 (按固定资产) */
  advanceAuctionList2: LIST_EMPTY,

  /** 献祭推荐 */
  advanceSacrificeList: LIST_EMPTY,

  /** 低价股 */
  advanceState: LIST_EMPTY,

  /** 角色本地收藏 */
  collected: {},

  /** 通天塔(α) */
  star: {},

  /** 通天塔(α)记录 */
  starLogs: LIST_EMPTY,

  /** 幻想乡 */
  fantasy: LIST_EMPTY,

  /** 股息预测 */
  test: {
    Daily: 0,
    Share: 0,
    Tax: 0,
    Temples: 0,
    Total: 0,
    _loaded: 0 as Loaded
  },

  /** @deprecated */
  _webview: true,

  /** StockPreview 展开/收起 */
  _stockPreview: false
}

export const LOADED = {
  advanceAuctionList2: false,
  advanceAuctionList: false,
  advanceBidList: false,
  advanceList: false,
  advanceSacrificeList: false,
  advanceState: false,
  asks: false,
  assets: false,
  auction: false,
  balance: false,
  bid: false,
  charaAll: false,
  charaAssets: false,
  charaTemple: false,
  characters: false,
  collected: false,
  cookie: false,
  depth: false,
  fantasy: false,
  hash: false,
  iconsCache: false,
  issuePrice: false,
  items: false,
  kline: false,
  mvi: false,
  myCharaAssets: false,
  myTemple: false,
  nbc: false,
  recent: false,
  refine_temple: false,
  rich: false,
  star: false,
  temple: false,
  test: false,
  topWeek: false,
  userLogs: false,
  valhallList: false
}
