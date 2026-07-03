/*
 * @Author: czy0729
 * @Date: 2023-04-26 14:35:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:34:05
 */
import { computed } from 'mobx'
import { getTimestamp } from '@utils'
import { computedFn } from '@utils/computed-fn'
import { LIST_EMPTY } from '@constants'
import {
  INIT_ASSETS,
  INIT_AUCTION_STATUS,
  INIT_CHARA_ASSETS,
  INIT_CHARACTERS_ITEM,
  INIT_DEPTH_ITEM,
  INIT_KLINE_ITEM,
  INIT_USER_LOGS
} from './init'
import State from './state'
import { defaultKey, defaultSort, paginationOnePage } from './ds'

import type { Id, ListEmpty, MonoId, StoreConstructor, UserId } from '@types'
import type { STATE } from './init'
import type { Characters, ListKey, MyTemple, TinygrailRedPacketLogItem } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  // -------------------- 纯计算 (直接 computedFn) --------------------
  /** 其他用户资产 */
  userAssets = computedFn((hash: UserId) => {
    return (this.state.userAssets[hash] || INIT_ASSETS) as typeof INIT_ASSETS
  })

  /** ICO 参与者 */
  initial = computedFn((monoId: MonoId | Id) => {
    return (this.state.initial[monoId] || LIST_EMPTY) as ListEmpty<{
      amount: number
      begin: string
      end: string
      name: string
      avatar: string
      nickName: string
      lastIndex: string
    }>
  })

  /** 董事会 */
  users = computedFn((monoId: MonoId) => {
    return (this.state.users[monoId] || LIST_EMPTY) as ListEmpty & {
      total?: number
    }
  })

  /** 角色奖池 */
  charaPool = computedFn((monoId: MonoId) => {
    return this.state.charaPool[monoId] || 0
  })

  /** 可拍卖信息 */
  valhallChara = computedFn((monoId: MonoId) => {
    return (this.state.valhallChara[monoId] || {}) as {
      amount: number
      price: number
      _loaded: number
    }
  })

  /** 上周拍卖记录 */
  auctionList = computedFn((monoId: MonoId) => {
    return (this.state.auctionList[monoId] || LIST_EMPTY) as ListEmpty<{
      amount: number
      id: number
      name: string
      nickname: string
      price: number
      state: number
      time: string
    }>
  })

  /** 当前拍卖状态 */
  auctionStatus = computedFn((monoId: MonoId) => {
    return (this.state.auctionStatus[monoId] || INIT_AUCTION_STATUS) as typeof INIT_AUCTION_STATUS
  })

  /** 历史萌王 */
  topWeekHistory = computedFn((prev: number = 1) => {
    return this.state.topWeekHistory[prev] || null
  })

  /** 检测用户有多少圣殿 */
  templeTotal = computedFn((hash: UserId) => {
    return this.state.templeTotal[hash] || 0
  })

  /** 检测用户有多少角色 */
  charaTotal = computedFn((hash: UserId) => {
    return this.state.charaTotal[hash] || 0
  })

  /** 红包记录 */
  redPacketLog = computedFn((userId: UserId) => {
    return (this.state.redPacketLog[userId] || LIST_EMPTY) as ListEmpty<TinygrailRedPacketLogItem>
  })

  // -------------------- 有副作用 (分离 init + computedFn) --------------------
  /** 全局人物数据 */
  private _characters = computedFn((monoId: MonoId | Id) => {
    return (this.state.characters[monoId] || INIT_CHARACTERS_ITEM) as Characters
  })

  /** 番市首富 */
  private _rich = computedFn((sort = defaultSort) => {
    return (this.state.rich[sort] || LIST_EMPTY) as ListEmpty
  })

  /** K 线 */
  private _kline = computedFn((monoId: MonoId) => {
    return (this.state.kline[monoId] || INIT_KLINE_ITEM) as typeof INIT_KLINE_ITEM
  })

  /** 深度图 */
  private _depth = computedFn((monoId: Id) => {
    return (this.state.depth[monoId] || INIT_DEPTH_ITEM) as typeof INIT_DEPTH_ITEM
  })

  /** 用户资产概览信息 */
  private _charaAssets = computedFn((hash: UserId) => {
    return (this.state.charaAssets[hash] || INIT_CHARA_ASSETS) as typeof INIT_CHARA_ASSETS
  })

  /** 我的挂单和交易记录 */
  private _userLogs = computedFn((monoId: MonoId) => {
    return (this.state.userLogs[monoId] || INIT_USER_LOGS) as typeof INIT_USER_LOGS
  })

  /** 记录所有角色的头像 Map (用于没有头像的列表) */
  private _iconsCache = computedFn((monoId: MonoId) => {
    return this.state.iconsCache[monoId] || ''
  })

  /** 用户圣殿 */
  private _temple = computedFn((hash: UserId = this.hash) => {
    return (this.state.temple[hash] || LIST_EMPTY) as ListEmpty
  })

  /** 用户所有角色信息 */
  private _charaAll = computedFn((hash: UserId = this.hash) => {
    return (this.state.charaAll[hash] || LIST_EMPTY) as ListEmpty
  })

  /** 我的某角色圣殿 */
  private _myTemple = computedFn((monoId: MonoId) => {
    return (this.state.myTemple[monoId] || {}) as MyTemple
  })

  /** 角色圣殿 */
  private _charaTemple = computedFn((monoId: Id) => {
    return (this.state.charaTemple[monoId] || LIST_EMPTY) as ListEmpty<MyTemple>
  })

  /** 角色发行价 */
  private _issuePrice = computedFn((monoId: Id) => {
    return this.state.issuePrice[monoId] || 0
  })

  /** 角色本地收藏 */
  private _collected = computedFn((monoId: MonoId) => {
    return this.state.collected[monoId] || 0
  })

  /** 通天塔(α) */
  private _star = computedFn((monoId: string) => {
    return (this.state.star[monoId] || LIST_EMPTY) as ListEmpty
  })

  /** 总览列表 */
  private _list = computedFn((key: ListKey = defaultKey) => {
    return (this.state[key] || LIST_EMPTY) as ListEmpty<Characters>
  })

  /** @deprecated 授权 cookie */
  @computed get cookie() {
    this.init('cookie')
    return this.state.cookie
  }

  /** 用户唯一标识 */
  @computed get hash() {
    this.init('hash')
    return this.state.hash
  }

  /** 用户资产 */
  @computed get assets() {
    this.init('assets', true)
    return this.state.assets
  }

  /** 最高市值 */
  @computed get mvc() {
    return this.state.mvc
  }

  /** 最大涨幅 */
  @computed get mrc() {
    return this.state.mrc
  }

  /** 最大跌幅 */
  @computed get mfc() {
    return this.state.mfc
  }

  /** ICO 最多资金 */
  @computed get mvi() {
    return this.state.mvi
  }

  /** ICO 最高人气 */
  @computed get mpi() {
    return this.state.mpi
  }

  /** ICO 最近活跃 */
  @computed get rai() {
    return this.state.rai
  }

  /** ICO 即将结束 */
  @computed get mri() {
    return this.state.mri
  }

  /** 最近活跃 */
  @computed get recent() {
    return this.state.recent
  }

  /** 新番市值 */
  @computed get tnbc() {
    return this.state.tnbc
  }

  /** 新番活跃 */
  @computed get nbc() {
    return this.state.nbc
  }

  /** 最高股息 */
  @computed get msrc() {
    return this.state.msrc
  }

  /** 精炼排行 */
  @computed get refine_temple() {
    return this.state.refine_temple
  }

  /** 我的买单 */
  @computed get bid() {
    this.init('bid', true)
    return this.state.bid
  }

  /** 我的买单映射 <人物 ID, index> */
  @computed get bidMap() {
    return this.state.bidMap
  }

  /** 我的卖单 */
  @computed get asks() {
    this.init('asks', true)
    return this.state.asks
  }

  /** 我的卖单映射 <人物 ID, index> */
  @computed get asksMap() {
    return this.state.asksMap
  }

  /** 我的持仓 */
  @computed get myCharaAssets() {
    this.init('myCharaAssets', true)
    return this.state.myCharaAssets
  }

  /** 资金日志 */
  @computed get balance() {
    this.init('balance', true)
    return this.state.balance
  }

  /** 英灵殿 */
  @computed get valhallList() {
    this.init('valhallList', true)
    return this.state.valhallList
  }

  /** 我的道具 */
  @computed get items() {
    this.init('items', true)
    return this.state.items
  }

  /** 我的拍卖 */
  @computed get auction() {
    this.init('auction', true)
    return this.state.auction
  }

  /** 我的拍卖映射 <人物 ID, index> */
  @computed get auctionMap() {
    return this.state.auctionMap
  }

  /** 最近圣殿 */
  @computed get templeLast() {
    return this.state.templeLast
  }

  /** 每周萌王 */
  @computed get topWeek() {
    this.init('topWeek', true)
    return this.state.topWeek
  }

  /** 卖一推荐 */
  @computed get advanceList() {
    this.init('advanceList', true)
    return this.state.advanceList
  }

  /** 买一推荐 */
  @computed get advanceBidList() {
    this.init('advanceBidList', true)
    return this.state.advanceBidList
  }

  /** 竞拍推荐 */
  @computed get advanceAuctionList() {
    this.init('advanceAuctionList', true)
    return this.state.advanceAuctionList
  }

  /** 竞拍推荐 (按固定资产) */
  @computed get advanceAuctionList2() {
    this.init('advanceAuctionList2', true)
    return this.state.advanceAuctionList2
  }

  /** 献祭推荐 */
  @computed get advanceSacrificeList() {
    this.init('advanceSacrificeList', true)
    return this.state.advanceSacrificeList
  }

  /** 低价股 */
  @computed get advanceState() {
    this.init('advanceState', true)
    return this.state.advanceState
  }

  /** 通天塔(α)记录 */
  @computed get starLogs() {
    return this.state.starLogs
  }

  /** 幻想乡 */
  @computed get fantasy() {
    this.init('fantasy', true)
    return this.state.fantasy
  }

  /** 股息预测 */
  @computed get test() {
    this.init('test', true)
    return this.state.test
  }

  /** 为谁设置塔图 */
  @computed get pic() {
    return this.state.pic
  }

  /**
   * @deprecated iOS 此刻是否显示 WebView
   */
  @computed get _webview() {
    return this.state._webview
  }

  /** StockPreview 展开 / 收起 */
  @computed get _stockPreview() {
    return this.state._stockPreview
  }

  /** 人物和圣殿合并成总览列表 */
  @computed get mergeList() {
    const { chara } = this.myCharaAssets
    const temple = this.temple()
    const map = {}
    chara.list.forEach(item => (map[item.id] = item))
    temple.list.forEach(item => {
      if (!map[item.id]) {
        map[item.id] = {
          ...this.characters(item.id),
          id: item.id,
          icon: item.cover,
          level: item.level,
          monoId: item.id,
          name: item.name,
          rank: item.rank,
          rate: item.rate,
          sacrifices: item.sacrifices,
          assets: item.assets,
          starForces: item.starForces,
          stars: item.stars
        }
      } else {
        map[item.id] = {
          ...map[item.id],
          rank: item.rank,
          sacrifices: item.sacrifices,
          assets: item.assets
        }
      }
    })

    return {
      list: Object.values(map),
      pagination: paginationOnePage,
      _loaded: getTimestamp()
    }
  }

  /** 税后股息比率 */
  @computed get testRatio() {
    const { Share, Tax } = this.test
    if (Share === 0 || Tax === 0) return 1
    return 1 - Tax / Share
  }

  // -------------------- 导出方法 (分离 init) --------------------
  /** 全局人物数据 */
  characters(monoId: MonoId | Id) {
    this.init('characters', true)
    return this._characters(monoId)
  }

  /** 番市首富 */
  rich(sort = defaultSort) {
    this.init('rich', true)
    return this._rich(sort)
  }

  /** K 线 */
  kline(monoId: MonoId) {
    this.init('kline', true)
    return this._kline(monoId)
  }

  /** 深度图 */
  depth(monoId: Id) {
    this.init('depth', true)
    return this._depth(monoId)
  }

  /** 用户资产概览信息 */
  charaAssets(hash: UserId) {
    this.init('charaAssets', true)
    return this._charaAssets(hash)
  }

  /** 我的挂单和交易记录 */
  userLogs(monoId: MonoId) {
    this.init('userLogs', true)
    return this._userLogs(monoId)
  }

  /** 记录所有角色的头像 Map (用于没有头像的列表) */
  iconsCache(monoId: MonoId) {
    this.init('iconsCache', true)
    return this._iconsCache(monoId)
  }

  /** 用户圣殿 */
  temple(hash: UserId = this.hash) {
    this.init('temple', true)
    return this._temple(hash)
  }

  /** 用户所有角色信息 */
  charaAll(hash: UserId = this.hash) {
    this.init('charaAll', true)
    return this._charaAll(hash)
  }

  /** 我的某角色圣殿 */
  myTemple(monoId: MonoId) {
    this.init('myTemple', true)
    return this._myTemple(monoId)
  }

  /** 角色圣殿 */
  charaTemple(monoId: Id) {
    this.init('charaTemple', true)
    return this._charaTemple(monoId)
  }

  /** 角色发行价 */
  issuePrice(monoId: Id) {
    this.init('issuePrice', true)
    return this._issuePrice(monoId)
  }

  /** 角色本地收藏 */
  collected(monoId: MonoId) {
    this.init('collected', true)
    return this._collected(monoId)
  }

  /** 通天塔(α) */
  star(monoId: string) {
    this.init('star', true)
    return this._star(monoId)
  }

  /** 总览列表 */
  list(key: ListKey = defaultKey) {
    this.init(key, true)
    return this._list(key)
  }
}
