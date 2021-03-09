/*
 * @Author: czy0729
 * @Date: 2019-08-24 23:20:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-09 16:32:38
 */
import { LIST_EMPTY } from '@constants'

export const NAMESPACE = 'Tinygrail'

export const INIT_CHARACTERS_ITEM = {
  // assets: 0, // 塔可用资产
  amount: 0, // 英灵殿数量
  asks: 0, // 当前市场卖出数
  bids: 0, // 当前市场买入数
  bonus: 0, // 新番加成(周)
  change: 0, // 今天成交量
  current: 0, // 当前价
  end: '', // 若角色当前是ico状态, 返回ico结束时间
  fluctuation: 0, // 涨跌幅
  icoId: 0, // 若角色当前是ico状态, 返回ico的id
  icon: '', // 头像
  id: 0, // 角色bgm id
  lastDeal: '', // 最近交易时间
  lastOrder: '', // 最近挂单时间
  level: 0, // 角色等级
  marketValue: 0, // 总市值
  monoId: 0, // 人物id
  name: '', // 人物中文名
  price: 0, // 英灵殿底价
  rank: 0, // 通天塔等级
  rate: 0, // 基本股息
  starForces: 0, // 通天塔献祭量
  stars: 0, // 通天塔星星
  total: 0, // 发行量
  type: 0, // 不详
  users: 0 // 若角色当前是ico状态, 返回当前参与ico人数
}

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
  ]
}

export const INIT_DEPTH_ITEM = {
  id: 0,
  asks: [],
  bids: []
}

export const INIT_ASSETS = {
  id: 0, // 当前用户Id
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
