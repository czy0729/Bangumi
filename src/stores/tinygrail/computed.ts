/*
 * @Author: czy0729
 * @Date: 2023-04-26 14:35:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-09 20:10:33
 */
import { computed } from 'mobx'
import { getTimestamp } from '@utils'
import { LIST_EMPTY } from '@constants'
import { Id, ListEmpty, MonoId, StoreConstructor, UserId } from '@types'
import {
  INIT_ASSETS,
  INIT_AUCTION_STATUS,
  INIT_CHARA_ASSETS,
  INIT_CHARACTERS_ITEM,
  INIT_DEPTH_ITEM,
  INIT_KLINE_ITEM,
  INIT_USER_LOGS,
  STATE
} from './init'
import State from './state'
import { defaultKey, defaultSort, paginationOnePage } from './ds'
import { Characters, ListKey, MyTemple } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 授权 cookie */
  @computed get cookie() {
    this.init('cookie')
    return this.state.cookie
  }

  /** 用户唯一标识 */
  @computed get hash() {
    this.init('hash')
    return this.state.hash
  }

  /** 全局人物数据 */
  characters(monoId: MonoId | Id) {
    this.init('characters')
    return computed<Characters>(() => {
      return this.state.characters[monoId] || INIT_CHARACTERS_ITEM
    }).get()
  }

  /** 番市首富 */
  rich(sort = defaultSort) {
    this.init('rich')
    return computed<ListEmpty>(() => {
      return this.state.rich[sort] || LIST_EMPTY
    }).get()
  }

  /** K 线 */
  kline(monoId: MonoId) {
    this.init('kline')
    return computed<typeof INIT_KLINE_ITEM>(() => {
      return this.state.kline[monoId] || INIT_KLINE_ITEM
    }).get()
  }

  /** 深度图 */
  depth(monoId: MonoId) {
    this.init('depth')
    return computed<typeof INIT_DEPTH_ITEM>(() => {
      return this.state.depth[monoId] || INIT_DEPTH_ITEM
    }).get()
  }

  /** 用户资产 */
  @computed get assets() {
    this.init('assets')
    return this.state.assets
  }

  /** 其他用户资产 */
  userAssets(hash: UserId) {
    return computed<typeof INIT_ASSETS>(() => {
      return this.state.userAssets[hash] || INIT_ASSETS
    }).get()
  }

  /** 用户资产概览信息 */
  charaAssets(hash: UserId) {
    this.init('charaAssets')
    return computed<typeof INIT_CHARA_ASSETS>(() => {
      return this.state.charaAssets[hash] || INIT_CHARA_ASSETS
    }).get()
  }

  /** 我的挂单和交易记录 */
  userLogs(monoId: MonoId) {
    this.init('userLogs')
    return computed<typeof INIT_USER_LOGS>(() => {
      return this.state.userLogs[monoId] || INIT_USER_LOGS
    }).get()
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
    this.init('bid')
    return this.state.bid
  }

  /** 我的卖单 */
  @computed get asks() {
    this.init('asks')
    return this.state.asks
  }

  /** 我的持仓 */
  @computed get myCharaAssets() {
    this.init('myCharaAssets')
    return this.state.myCharaAssets
  }

  /** 资金日志 */
  @computed get balance() {
    this.init('balance')
    return this.state.balance
  }

  /** 记录所有角色的头像 Map (用于没有头像的列表) */
  iconsCache(monoId: MonoId) {
    this.init('iconsCache')
    return computed<string>(() => {
      return this.state.iconsCache[monoId] || ''
    }).get()
  }

  /** ICO 参与者 */
  initial(monoId: MonoId | Id) {
    return computed<ListEmpty>(() => {
      return this.state.initial[monoId] || LIST_EMPTY
    }).get()
  }

  /** 董事会 */
  users(monoId: MonoId) {
    return computed<
      ListEmpty & {
        total?: number
      }
    >(() => {
      return this.state.users[monoId] || LIST_EMPTY
    }).get()
  }

  /** 角色奖池 */
  charaPool(monoId: MonoId) {
    return computed<number>(() => {
      return this.state.charaPool[monoId] || 0
    }).get()
  }

  /** 用户圣殿 */
  temple(hash: UserId = this.hash) {
    this.init('temple')
    return computed<ListEmpty>(() => {
      return this.state.temple[hash] || LIST_EMPTY
    }).get()
  }

  /** 用户所有角色信息 */
  charaAll(hash: UserId = this.hash) {
    this.init('charaAll')
    return computed<ListEmpty>(() => {
      return this.state.charaAll[hash] || LIST_EMPTY
    }).get()
  }

  /** 我的某角色圣殿 */
  myTemple(monoId: MonoId) {
    this.init('myTemple')
    return computed<MyTemple>(() => {
      return this.state.myTemple[monoId] || {}
    }).get()
  }

  /** 角色圣殿 */
  charaTemple(monoId: MonoId) {
    this.init('charaTemple')
    return computed<ListEmpty<MyTemple>>(() => {
      return this.state.charaTemple[monoId] || LIST_EMPTY
    }).get()
  }

  /** 可拍卖信息 */
  valhallChara(monoId: MonoId) {
    return computed<{
      amount: number
      price: number
      _loaded: number
    }>(() => {
      return this.state.valhallChara[monoId] || {}
    }).get()
  }

  /** 上周拍卖记录 */
  auctionList(monoId: MonoId) {
    return computed<ListEmpty>(() => {
      return this.state.auctionList[monoId] || LIST_EMPTY
    }).get()
  }

  /** 英灵殿 */
  @computed get valhallList() {
    this.init('valhallList')
    return this.state.valhallList
  }

  /** 我的道具 */
  @computed get items() {
    this.init('items')
    return this.state.items
  }

  /** 我的拍卖列表 */
  @computed get auction() {
    this.init('auction')
    return this.state.auction
  }

  /** 当前拍卖状态 */
  auctionStatus(monoId: MonoId) {
    return computed<typeof INIT_AUCTION_STATUS>(() => {
      return this.state.auctionStatus[monoId] || INIT_AUCTION_STATUS
    }).get()
  }

  /** 角色发行价 */
  issuePrice(monoId: MonoId) {
    this.init('issuePrice')
    return computed<number>(() => {
      return this.state.issuePrice[monoId] || 0
    }).get()
  }

  /** 最近圣殿 */
  @computed get templeLast() {
    return this.state.templeLast
  }

  /** 每周萌王 */
  @computed get topWeek() {
    this.init('topWeek')
    return this.state.topWeek
  }

  /** 检测用户有多少圣殿 */
  templeTotal(hash: UserId) {
    return computed<number>(() => {
      return this.state.templeTotal[hash] || 0
    }).get()
  }

  /** 检测用户有多少角色 */
  charaTotal(hash: UserId) {
    return computed<number>(() => {
      return this.state.charaTotal[hash] || 0
    }).get()
  }

  /** 卖一推荐 */
  @computed get advanceList() {
    this.init('advanceList')
    return this.state.advanceList
  }

  /** 买一推荐 */
  @computed get advanceBidList() {
    this.init('advanceBidList')
    return this.state.advanceBidList
  }

  /** 竞拍推荐 */
  @computed get advanceAuctionList() {
    this.init('advanceAuctionList')
    return this.state.advanceAuctionList
  }

  /** 竞拍推荐 (按固定资产) */
  @computed get advanceAuctionList2() {
    this.init('advanceAuctionList2')
    return this.state.advanceAuctionList2
  }

  /** 献祭推荐 */
  @computed get advanceSacrificeList() {
    this.init('advanceSacrificeList')
    return this.state.advanceSacrificeList
  }

  /** 低价股 */
  @computed get advanceState() {
    this.init('advanceState')
    return this.state.advanceState
  }

  /** 角色本地收藏 */
  collected(monoId: MonoId) {
    this.init('collected')
    return computed<number>(() => {
      return this.state.collected[monoId] || 0
    }).get()
  }

  /** 通天塔(α) */
  star(monoId: string) {
    this.init('star')
    return computed<ListEmpty>(() => {
      return this.state.star[monoId] || LIST_EMPTY
    }).get()
  }

  /** 通天塔(α)记录 */
  @computed get starLogs() {
    return this.state.starLogs
  }

  /** 幻想乡 */
  @computed get fantasy() {
    this.init('fantasy')
    return this.state.fantasy
  }

  /** 股息预测 */
  @computed get test() {
    this.init('test')
    return this.state.test
  }

  /**
   * @deprecated iOS 此刻是否显示 WebView
   *  - 此bug在 sdk37 下已不存在
   *  - 新的 WKWebView 已代替老的 UIWebView, 但是当前版本新的有一个致命的问题,
   * 页面发生切换动作时, 会导致 WebView 重新渲染, 底色写死是白色, 在一些暗色调的页面里面,
   * 会导致闪白屏, 这个非常不友好, 暂时只想到通过维护一个全局变量去决定是否渲染 WebView
   */
  @computed get _webview() {
    return this.state._webview
  }

  /** StockPreview 展开 / 收起 */
  @computed get _stockPreview() {
    return this.state._stockPreview
  }

  // -------------------- computed --------------------
  /** 总览列表 */
  list(key: ListKey = defaultKey) {
    this.init(key)
    return computed<ListEmpty<Characters>>(() => {
      return this.state[key] || LIST_EMPTY
    }).get()
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
}
