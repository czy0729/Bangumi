/*
 * 小圣杯
 * @Author: czy0729
 * @Date: 2019-08-24 23:18:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 20:04:20
 */
import { observable, computed, toJS } from 'mobx'
import { getTimestamp, toFixed, lastDate, HTMLDecode, info } from '@utils'
import store from '@utils/store'
import { queue, xhrCustom } from '@utils/fetch'
import axios from '@utils/thirdParty/axios'
import {
  API_TINYGRAIL_ASK,
  API_TINYGRAIL_ASSETS,
  API_TINYGRAIL_AUCTION,
  API_TINYGRAIL_AUCTION_CANCEL,
  API_TINYGRAIL_AUCTION_LIST,
  API_TINYGRAIL_AUCTION_STATUS,
  API_TINYGRAIL_BALANCE,
  API_TINYGRAIL_BID,
  API_TINYGRAIL_BONUS,
  API_TINYGRAIL_BONUS_DAILY,
  API_TINYGRAIL_BONUS_HOLIDAY,
  API_TINYGRAIL_CANCEL_ASK,
  API_TINYGRAIL_CANCEL_BID,
  API_TINYGRAIL_CHARA,
  API_TINYGRAIL_CHARA_ALL,
  API_TINYGRAIL_CHARA_ASKS,
  API_TINYGRAIL_CHARA_ASSETS,
  API_TINYGRAIL_CHARA_BID,
  API_TINYGRAIL_CHARA_STAR,
  API_TINYGRAIL_CHARA_TEMPLE,
  API_TINYGRAIL_CHARTS,
  API_TINYGRAIL_DAILY_COUNT,
  API_TINYGRAIL_DEPTH,
  API_TINYGRAIL_FANTASY_LIST,
  API_TINYGRAIL_HASH,
  API_TINYGRAIL_INIT,
  API_TINYGRAIL_INITIAL,
  API_TINYGRAIL_ISSUE_PRICE,
  API_TINYGRAIL_ITEMS,
  API_TINYGRAIL_JOIN,
  API_TINYGRAIL_LINK,
  API_TINYGRAIL_LIST,
  API_TINYGRAIL_MAGIC,
  API_TINYGRAIL_MY_AUCTION_LIST,
  API_TINYGRAIL_MY_CHARA_ASSETS,
  API_TINYGRAIL_RICH,
  API_TINYGRAIL_SACRIFICE,
  API_TINYGRAIL_SCRATCH,
  API_TINYGRAIL_SCRATCH2,
  API_TINYGRAIL_SEARCH,
  API_TINYGRAIL_STAR,
  API_TINYGRAIL_STAR_LOGS,
  API_TINYGRAIL_TEMPLE,
  API_TINYGRAIL_TEMPLE_LAST,
  API_TINYGRAIL_TOP_WEEK,
  API_TINYGRAIL_USERS,
  API_TINYGRAIL_USER_CHARA,
  API_TINYGRAIL_USER_CHARA_TOTAL,
  API_TINYGRAIL_USER_TEMPLE_TOTAL,
  API_TINYGRAIL_VALHALL_CHARA,
  API_TINYGRAIL_VALHALL_LIST,
  DEV,
  LIST_EMPTY,
  SDK,
  TINYGRAIL_ASSETS_LIMIT
} from '@constants'
import { Id, ListEmpty, MonoId, StoreConstructor, UserId } from '@types'
import UserStore from '../user'
import {
  NAMESPACE,
  INIT_RICH,
  INIT_KLINE_ITEM,
  INIT_DEPTH_ITEM,
  INIT_ASSETS,
  INIT_CHARA_ASSETS,
  INIT_USER_LOGS,
  INIT_MY_CHARA_ASSETS,
  INIT_AUCTION_STATUS,
  INIT_CHARACTERS_ITEM
} from './init'
import { throttleInfo, toCharacter, calculateRate } from './utils'
import { defaultKey, defaultSort, paginationOnePage } from './ds'
import { Characters, ListKey } from './types'
import { TinygrailMagic } from '@constants/api/types'

const state = {
  /** 授权 cookie */
  cookie: '',

  /** 高级会员 */
  advance: false,

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

  /** 我的卖单 */
  asks: LIST_EMPTY,

  /** 我的持仓 */
  myCharaAssets: INIT_MY_CHARA_ASSETS,

  /** 资金日志 */
  balance: LIST_EMPTY,

  /** 记录所有角色的头像 Map (用于没有头像的列表) */
  iconsCache: {},

  /** ICO 参与者 */
  initial: {},

  /** 董事会 */
  users: {},

  /** 用户圣殿 */
  temple: {},

  /** 用户所有角色信息 */
  charaAll: {},

  /** 角色圣殿 */
  charaTemple: {},

  /** 可拍卖信息 */
  valhallChara: {},

  /** 上周拍卖记录 */
  auctionList: {},

  /** 英灵殿 */
  valhallList: LIST_EMPTY,

  /** 我的道具 */
  items: LIST_EMPTY,

  /** 我的拍卖列表 */
  auction: LIST_EMPTY,

  /** 当前拍卖状态 */
  auctionStatus: {},

  /** 角色发行价 */
  issuePrice: {},

  /** 最近圣殿 */
  templeLast: LIST_EMPTY,

  /** 每周萌王 */
  topWeek: LIST_EMPTY,

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

  /** @deprecated */
  _webview: true,

  /** StockPreview 展开/收起 */
  _stockPreview: false
}

class TinygrailStore extends store implements StoreConstructor<typeof state> {
  state = observable(state)

  private _loaded = {
    advance: false,
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
    nbc: false,
    recent: false,
    rich: false,
    star: false,
    temple: false,
    topWeek: false,
    userLogs: false,
    valhallList: false
  }

  init = (key: keyof typeof this._loaded | ListKey) => {
    if (!key || this._loaded[key]) return true

    if (DEV) console.info('TinygrailStore /', key)

    this._loaded[key] = true
    return this.readStorage([key], NAMESPACE)
  }

  save = (key: keyof typeof this._loaded | ListKey) => {
    return this.setStorage(key, undefined, NAMESPACE)
  }

  // -------------------- get --------------------
  /** 授权 cookie */
  @computed get cookie() {
    this.init('cookie')
    return this.state.cookie
  }

  /** 高级会员 */
  @computed get advance() {
    this.init('advance')
    return this.state.advance
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
    return computed<ListEmpty>(() => {
      return this.state.users[monoId] || LIST_EMPTY
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

  /** 角色圣殿 */
  charaTemple(monoId: MonoId) {
    this.init('charaTemple')
    return computed<ListEmpty>(() => {
      return this.state.charaTemple[monoId] || LIST_EMPTY
    }).get()
  }

  /** 可拍卖信息 */
  valhallChara(monoId: MonoId) {
    return computed<ListEmpty>(() => {
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
  star(monoId: MonoId) {
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

  // -------------------- fetch --------------------
  /** 小圣杯统一请求入口 */
  // @ts-ignore
  fetch = (url: string, isPost?: boolean, data?: any, showError?: boolean) => {
    global.log(`⚡️ ${url}`)

    // @ts-ignore
    axios.defaults.withCredentials = false
    const config: any = {
      method: isPost ? 'POST' : 'GET',
      url,
      responseType: 'json',
      headers: {
        Cookie: this.cookie
      }
    }
    if (data) config.data = data

    // @ts-ignore
    return axios(config).catch(() => {
      if (showError) info('接口出错')
    })
  }

  /** 判断是否高级用户 */
  fetchAdvance = async () => {
    if (this.advance) return true
    if (!UserStore.myId) return false
    try {
      const { _response } = await xhrCustom({
        // url: 'https://czy0729.github.io/Bangumi/web/advance.json'
        url: `https://gitee.com/a296377710/bangumi/raw/master/advance.json?t=${getTimestamp()}`
      })
      const advanceUserMap = JSON.parse(_response)

      if (advanceUserMap[UserStore.myId]) {
        const key = 'advance'
        this.setState({
          advance: true
        })
        this.save(key)
      }
    } catch (error) {
      console.error(NAMESPACE, 'fetchAdvance', error)
    }
    return true
  }

  /**
   * 人物数据
   *  - 20201017 API_TINYGRAIL_CHARAS => API_TINYGRAIL_CHARA
   *  - 20210306 optimize
   * @param {*} ids
   */
  fetchCharacters = async (ids: any[]) => {
    const key = 'characters'
    const result = await this.fetch(API_TINYGRAIL_CHARA(parseInt(ids[0])))

    if (result.data.State === 0) {
      const data = {}
      const iconsCache = {}

      const target = Array.isArray(result.data.Value)
        ? result.data.Value
        : [result.data.Value]
      target.forEach(item => {
        const id = item.CharacterId || item.Id
        if (item.Icon) iconsCache[id] = item.Icon
        data[id] = toCharacter(item)
      })

      this.updateIconsCache(iconsCache)
      this.setState({
        [key]: data
      })
      this.save(key)
    }

    return Promise.resolve(this.state[key])
  }

  /**
   * 总览列表
   *  - 自行添加顺序index, 以支持二次排序显示
   *  - 20210306 optimize
   */
  fetchList = async (key: ListKey = defaultKey) => {
    const result = await this.fetch(API_TINYGRAIL_LIST(key))

    if (result.data.State === 0) {
      const iconsCache = {}
      const data = {
        ...LIST_EMPTY,
        list: (result.data.Value.Items || result.data.Value).map((item, index) => {
          const character: any = toCharacter(item)
          const id = item.CharacterId || item.Id
          const { icon } = character
          if (icon) iconsCache[id] = icon

          if (item.End) {
            return {
              ...character,
              _index: index + 1,
              id,
              icoId: item.End ? item.Id : 0
            }
          }
          return {
            ...character,
            _index: index + 1
          }
        }),
        pagination: paginationOnePage,
        _loaded: getTimestamp()
      }

      this.updateIconsCache(iconsCache)
      this.setState({
        [key]: data
      })
      this.save(key)
    }

    return Promise.resolve(this.state[key])
  }

  /** 番市首富 */
  fetchRich = async (sort = defaultSort) => {
    const [page, limit] = sort.split('/')
    const result = await this.fetch(API_TINYGRAIL_RICH(Number(page), Number(limit)))

    let data = {
      ...LIST_EMPTY
    }
    if (result.data.State === 0) {
      data = {
        ...LIST_EMPTY,
        list: result.data.Value.map(item => ({
          avatar: item.Avatar,
          nickname: HTMLDecode(item.Nickname),
          userId: item.Name,
          assets: toFixed(item.Assets, 2),
          total: toFixed(item.TotalBalance, 2),
          share: toFixed(item.Share, 2),
          principal: item.Principal,
          lastActiveDate: item.LastActiveDate,
          lastIndex: item.LastIndex,
          state: item.State
        })),
        pagination: paginationOnePage,
        _loaded: getTimestamp()
      }
    }

    const key = 'rich'
    const { rich } = this.state
    this.setState({
      [key]: {
        ...rich,
        [sort]: data
      }
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** K 线原始数据 */
  fetchKline = async (monoId: MonoId) => {
    const result = await this.fetch(API_TINYGRAIL_CHARTS(monoId), true)

    const data: any = {
      id: monoId,
      data: []
    }
    if (result.data.State === 0) {
      data._loaded = getTimestamp()
      data.data = result.data.Value
        // K线图排除掉刮刮乐10元的记录, 以获得更正常的K线表现
        .filter(item => !(item.Low === 10 && item.Low !== item.High))
        .map(item => ({
          time: item.Time,
          begin: item.Begin,
          end: item.End,
          low: item.Low,
          high: item.High,
          amount: item.Amount,
          price: item.Price
        }))
    }

    const key = 'kline'
    this.setState({
      [key]: {
        [monoId]: data
      }
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** 深度图 */
  fetchDepth = async (monoId: MonoId) => {
    const result = await this.fetch(API_TINYGRAIL_DEPTH(monoId), true)

    const data: any = {
      ...INIT_DEPTH_ITEM
    }
    if (result.data.State === 0) {
      data._loaded = getTimestamp()
      data.asks = result.data.Value.Asks.map(item => ({
        price: item.Price,
        amount: item.Amount
      }))
      data.bids = result.data.Value.Bids.map(item => ({
        price: item.Price,
        amount: item.Amount
      }))
    }

    const key = 'depth'
    this.setState({
      [key]: {
        [monoId]: data
      }
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** 用户唯一标识 */
  fetchHash = async () => {
    const result = await this.fetch(API_TINYGRAIL_HASH())

    let data = ''
    if (result.data.State === 0) {
      data = result.data.Value.Hash
    }

    const key = 'hash'
    this.setState({
      [key]: data
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** 资产信息 */
  fetchAssets = async () => {
    const result = await this.fetch(API_TINYGRAIL_ASSETS())

    let data = {
      ...INIT_ASSETS
    }
    if (result.data.State === 0) {
      data = {
        id: result.data.Value.Id,
        balance: result.data.Value.Balance,
        assets: result.data.Value.Assets,
        lastIndex: result.data.Value.LastIndex,
        _loaded: getTimestamp()
      }
    }

    const key = 'assets'
    this.setState({
      [key]: data
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** 其他用户资产信息 */
  fetchUserAssets = async (hash: UserId) => {
    const result = await this.fetch(API_TINYGRAIL_ASSETS(hash))

    let data = {
      ...INIT_ASSETS
    }
    if (result.data.State === 0) {
      data = {
        id: result.data.Value.Id,
        balance: result.data.Value.Balance,
        assets: result.data.Value.Assets,
        lastIndex: result.data.Value.LastIndex,
        _loaded: getTimestamp()
      }
    }

    const key = 'userAssets'
    this.setState({
      [key]: {
        [hash]: data
      }
    })

    return Promise.resolve(data)
  }

  /** 用户资产概览信息 */
  fetchCharaAssets = async (hash: UserId) => {
    const result = await this.fetch(API_TINYGRAIL_CHARA_ASSETS(hash))

    const data: any = {
      ...INIT_CHARA_ASSETS
    }
    if (result.data.State === 0) {
      const iconsCache = toJS(this.state.iconsCache)
      data._loaded = getTimestamp()
      data.id = result.data.Value.Id
      data.balance = result.data.Value.Balance
      data.characters = result.data.Value.Characters.map(item => {
        if (item.Icon) iconsCache[item.Id] = item.Icon
        return {
          id: item.Id,
          icon: item.Icon,
          name: item.Name,
          current: item.Current,
          state: item.State,
          total: item.Total,
          bonus: item.Bonus,
          rate: Number(toFixed(item.Rate, 2)),
          level: item.Level,
          marketValue: item.MarketValue,
          change: item.Change,
          fluctuation: item.Fluctuation
        }
      })
      data.initials = result.data.Value.Initials.map(item => {
        if (item.Icon) iconsCache[item.Id] = item.Icon
        return {
          id: item.Id,
          icon: item.Icon,
          name: item.Name,
          current: 0,
          state: item.State,
          total: item.Total,
          bonus: item.Bonus,
          rate: Number(toFixed(item.Rate, 2)),
          level: item.Level,
          marketValue: item.MarketValue,
          change: item.Change,
          fluctuation: item.Fluctuation
        }
      })
      this.updateIconsCache(iconsCache)
    }

    const key = 'charaAssets'
    this.setState({
      [key]: {
        [hash]: data
      }
    })
    // this.save(key)

    return Promise.resolve(data)
  }

  /**
   * 英灵殿
   *  - 20210306 optimize, 更新全局角色基本数据
   */
  fetchValhallList = async () => {
    const key = 'valhallList'
    const result = await this.fetch(API_TINYGRAIL_VALHALL_LIST(1, 1600))
    if (result.data.State === 0) {
      const keys = [
        'asks',
        'bids',
        'bonus',
        'change',
        'current',
        'fluctuation',
        'icon',
        'id',
        'lastOrder',
        'level',
        'marketValue',
        'name',
        'price',
        'rank',
        'rate',
        'starForces',
        'stars',
        'state',
        'total'
      ]
      const iconsCache = {}
      const characters = {}
      const data = {
        list: result.data.Value.Items.map(item => {
          const character: any = toCharacter(item, keys)
          const {
            bonus,
            current,
            fluctuation,
            icon,
            id,
            level,
            rank,
            rate,
            sacrifices,
            stars
          } = character

          if (icon) iconsCache[id] = icon
          characters[id] = {
            ...this.characters(id),
            bonus,
            current,
            fluctuation,
            icon,
            id,
            level,
            rank,
            rate,
            sacrifices,
            stars
          }

          return character
        }),
        pagination: paginationOnePage,
        _loaded: getTimestamp()
      }

      this.updateCharacters(characters)
      this.setState({
        [key]: data
      })
      this.save(key)
    }

    return Promise.resolve(this.state[key])
  }

  /** 幻想乡 (逻辑同英灵殿) */
  fetchFantasyList = async () => {
    const key = 'fantasy'
    const result = await this.fetch(API_TINYGRAIL_FANTASY_LIST())
    if (result.data.State === 0) {
      const keys = [
        'asks',
        'bids',
        'bonus',
        'change',
        'current',
        'fluctuation',
        'icon',
        'id',
        'lastOrder',
        'level',
        'marketValue',
        'name',
        'price',
        'rank',
        'rate',
        'starForces',
        'stars',
        'state',
        'total',
        'userAmount'
      ]
      const iconsCache = {}
      const characters = {}
      const data = {
        list: result.data.Value.Items.map(item => {
          const character: any = toCharacter(item, keys)
          const {
            bonus,
            current,
            fluctuation,
            icon,
            id,
            level,
            rank,
            rate,
            sacrifices,
            stars
          } = character

          if (icon) iconsCache[id] = icon
          characters[id] = {
            ...this.characters(id),
            bonus,
            current,
            fluctuation,
            icon,
            id,
            level,
            rank,
            rate,
            sacrifices,
            stars
          }

          return character
        }),
        pagination: paginationOnePage,
        _loaded: getTimestamp()
      }

      this.updateCharacters(characters)
      this.setState({
        [key]: data
      })
      this.save(key)
    }

    return Promise.resolve(this.state[key])
  }

  /** 我的道具 */
  fetchItems = async () => {
    const result = await this.fetch(API_TINYGRAIL_ITEMS())

    const data = {
      ...LIST_EMPTY
    }
    if (result.data.State === 0) {
      data._loaded = getTimestamp()
      data.list = result.data.Value.Items.map(item => ({
        id: item.Id,
        name: item.Name,
        icon: item.Icon,
        line: item.Line,
        amount: item.Amount,
        last: item.Last
      }))
    }

    const key = 'items'
    this.setState({
      [key]: data
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** 每周萌王 */
  fetchTopWeek = async () => {
    const result = await this.fetch(API_TINYGRAIL_TOP_WEEK())

    const data = {
      ...LIST_EMPTY
    }
    if (result.data.State === 0) {
      const { list: lastList } = this.topWeek

      data._loaded = getTimestamp()
      data.list = result.data.Value.map((item, index) => {
        const lastItem = lastList.find(i => i.id === item.CharacterId) || {
          rank: 0,
          extra: 0,
          type: 0
        }

        const rank = index + 1
        return {
          id: item.CharacterId,
          avatar: item.Avatar,
          name: item.CharacterName,
          price: item.Price,
          sacrifices: item.Sacrifices,
          assets: item.Assets,
          extra: item.Extra,
          extraChange: item.Extra - lastItem.extra,
          rank,
          rankChange: lastItem.rank === 0 ? 'new' : lastItem.rank - rank,
          type: item.Type,
          typeChange: item.Type - (lastItem.type || 0)
        }
      })
    }

    const key = 'topWeek'
    this.setState({
      [key]: data
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** 检测用户有多少圣殿 */
  fetchTempleTotal = async hash => {
    const result = await this.fetch(API_TINYGRAIL_USER_TEMPLE_TOTAL(hash))
    let total = 0
    if (result.data.State === 0) {
      total = result.data.Value.TotalItems
    }

    const key = 'templeTotal'
    this.setState({
      [key]: {
        [hash]: total
      }
    })
    return Promise.resolve(total)
  }

  /** 检测用户有多少人物 */
  fetchCharaTotal = async (hash: UserId) => {
    const result = await this.fetch(API_TINYGRAIL_USER_CHARA_TOTAL(hash))
    let total = 0
    if (result.data.State === 0) {
      total = result.data.Value.TotalItems
    }

    const key = 'charaTotal'
    this.setState({
      [key]: {
        [hash]: total
      }
    })
    return Promise.resolve(total)
  }

  /** 用户挂单和交易记录 */
  fetchUserLogs = async (monoId: MonoId) => {
    const result = await this.fetch(API_TINYGRAIL_USER_CHARA(monoId))

    let data = {
      ...INIT_USER_LOGS
    }
    if (result.data.State === 0) {
      data = {
        id: result.data.Value.Id,
        amount: result.data.Value.Amount,
        balance: result.data.Value.Balance,
        askHistory: result.data.Value.AskHistory.map(item => ({
          id: item.Id,
          characterId: item.CharacterId,
          amount: item.Amount,
          price: item.Price,
          time: item.TradeTime
        })),
        asks: result.data.Value.Asks.map(item => ({
          id: item.Id,
          characterId: item.CharacterId,
          amount: item.Amount,
          price: item.Price,
          time: item.Begin,
          type: item.Type
        })),
        bidHistory: result.data.Value.BidHistory.map(item => ({
          id: item.Id,
          characterId: item.CharacterId,
          amount: item.Amount,
          price: item.Price,
          time: item.TradeTime
        })),
        bids: result.data.Value.Bids.map(item => ({
          id: item.Id,
          characterId: item.CharacterId,
          amount: item.Amount,
          price: item.Price,
          time: item.Begin,
          type: item.Type
        })),
        // @ts-ignore
        sacrifices: result.data.Value.Sacrifices,
        _loaded: getTimestamp()
      }
    }

    const key = 'userLogs'
    this.setState({
      [key]: {
        [monoId]: data
      }
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** 我的买单 */
  fetchBid = async () => {
    const result = await this.fetch(API_TINYGRAIL_CHARA_BID())

    let data = {
      ...LIST_EMPTY
    }
    if (result.data.State === 0) {
      const iconsCache = toJS(this.state.iconsCache)
      data = {
        ...LIST_EMPTY,
        list: result.data.Value.Items.map(item => {
          if (item.Icon) iconsCache[item.Id] = item.Icon
          return {
            id: item.Id,
            bids: item.Bids,
            asks: item.Asks,
            change: item.Change,
            current: item.Current,
            fluctuation: item.Fluctuation ? item.Fluctuation * 100 : '',
            total: item.Total,
            marketValue: item.MarketValue,
            lastOrder: item.LastOrder,
            end: item.End,
            users: item.Users,
            name: item.Name,
            icon: item.Icon,
            bonus: item.Bonus,
            state: item.State,
            rate: Number(toFixed(item.Rate, 2)),
            level: item.Level,
            sa: item.Sacrifices,
            rank: item.Rank,
            stars: item.Stars,
            starForces: item.StarForces
          }
        }),
        pagination: paginationOnePage,
        _loaded: getTimestamp()
      }
      this.updateIconsCache(iconsCache)
    }

    const key = 'bid'
    this.setState({
      [key]: data
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** 我的卖单 */
  fetchAsks = async () => {
    const result = await this.fetch(API_TINYGRAIL_CHARA_ASKS())

    let data = {
      ...LIST_EMPTY
    }
    if (result.data.State === 0) {
      const iconsCache = toJS(this.state.iconsCache)
      data = {
        ...LIST_EMPTY,
        list: result.data.Value.Items.map(item => {
          if (item.Icon) iconsCache[item.Id] = item.Icon
          return {
            id: item.Id,
            bids: item.Bids,
            asks: item.Asks,
            change: item.Change,
            current: item.Current,
            fluctuation: item.Fluctuation ? item.Fluctuation * 100 : '',
            total: item.Total,
            marketValue: item.MarketValue,
            lastOrder: item.LastOrder,
            end: item.End,
            users: item.Users,
            name: item.Name,
            icon: item.Icon,
            bonus: item.Bonus,
            state: item.State,
            rate: Number(toFixed(item.Rate, 2)),
            level: item.Level,
            sa: item.Sacrifices,
            rank: item.Rank,
            stars: item.Stars,
            starForces: item.StarForces
          }
        }),
        pagination: paginationOnePage,
        _loaded: getTimestamp()
      }
      this.updateIconsCache(iconsCache)
    }

    const key = 'asks'
    this.setState({
      [key]: data
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** 我的拍卖列表 */
  fetchAuction = async () => {
    const result = await this.fetch(API_TINYGRAIL_MY_AUCTION_LIST())

    let data = {
      ...LIST_EMPTY
    }
    if (result.data.State === 0) {
      const iconsCache = toJS(this.state.iconsCache)
      data = {
        ...LIST_EMPTY,
        list: result.data.Value.Items.map(item => {
          if (item.Icon) {
            iconsCache[item.CharacterId] = item.Icon
          }

          // <INIT_AUCTION_ITEM>
          return {
            id: item.Id,
            monoId: item.CharacterId,
            name: item.Name,
            icon: item.Icon,
            marketValue: item.MarketValue,
            total: item.Total,
            rate: Number(toFixed(item.Rate, 2)),
            level: item.Level,
            amount: item.Amount,
            price: item.Price,
            state: item.State,
            lastOrder: item.Bid
          }
        }),
        pagination: paginationOnePage,
        _loaded: getTimestamp()
      }
      this.updateIconsCache(iconsCache)
    }

    const key = 'auction'
    this.setState({
      [key]: data
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** 当前拍卖状态 */
  fetchAuctionStatus = async monoId => {
    const result = await this.fetch(API_TINYGRAIL_AUCTION_STATUS(), true, [
      parseInt(monoId)
    ])

    const { State, Value } = result.data
    let data: any = INIT_AUCTION_STATUS
    if (State === 0) {
      data = {
        state: Value[0] ? Value[0].State : 0,
        type: Value[0] ? Value[0].Type : 0,
        _loaded: getTimestamp()
      }
    }

    const key = 'auctionStatus'
    this.setState({
      [key]: {
        [monoId]: data
      }
    })
    return Promise.resolve(data)
  }

  /**
   * 我的持仓
   * @notice 这个接口只显示有流动股的角色
   */
  fetchMyCharaAssets = async () => {
    await this.fetchCharaAll() // 从这里获取自己的固定资产数量
    const result = await this.fetch(API_TINYGRAIL_MY_CHARA_ASSETS()) // 这个接口没有返回自己的固定资产数量

    let data: any = {
      ...INIT_MY_CHARA_ASSETS
    }
    if (result.data.State === 0) {
      const { list } = this.charaAll(this.hash)
      const charaAllMap = {}
      list.forEach(item => (charaAllMap[item.id] = item))

      const iconsCache = toJS(this.state.iconsCache)
      data = {
        chara: {
          list: result.data.Value.Characters.map(item => {
            if (item.Icon) iconsCache[item.Id] = item.Icon
            return {
              id: item.Id,
              monoId: item.CharacterId,
              bids: item.Bids,
              asks: item.Asks,
              change: item.Change,
              current: item.Current,
              fluctuation: item.Fluctuation ? item.Fluctuation * 100 : '',
              total: item.Total,
              marketValue: item.MarketValue,
              lastOrder: item.LastOrder,
              end: item.End,
              users: item.Users,
              name: item.Name,
              icon: item.Icon,
              bonus: item.Bonus,
              state: item.State,
              rate: Number(toFixed(item.Rate, 2)),
              level: item.Level,
              sacrifices: charaAllMap[item.Id]?.sacrifices || 0,
              rank: item.Rank || 0,
              stars: item.Stars || 0,
              starForces: item.StarForces || 0
            }
          }),
          pagination: paginationOnePage,
          _loaded: getTimestamp()
        },
        ico: {
          list: result.data.Value.Initials.map(item => {
            if (item.Icon) iconsCache[item.Id] = item.Icon
            return {
              id: item.Id,
              monoId: item.CharacterId,
              bids: item.Bids,
              asks: item.Asks,
              change: item.Change,
              current: item.Current,
              fluctuation: item.Fluctuation ? item.Fluctuation * 100 : '',
              total: item.Total,
              marketValue: item.MarketValue,
              lastOrder: item.LastOrder,
              end: item.End,
              users: item.Users,
              name: item.Name,
              icon: item.Icon,
              bonus: item.Bonus,
              state: item.State,
              rate: Number(toFixed(item.Rate, 2)),
              level: item.Level
            }
          }),
          pagination: paginationOnePage,
          _loaded: getTimestamp()
        },
        _loaded: getTimestamp()
      }
      this.updateIconsCache(iconsCache)
    }

    const key = 'myCharaAssets'
    this.setState({
      [key]: data
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** ICO 参与者 */
  fetchInitial = async (monoId: Id) => {
    // TotalPages
    const result = await this.fetch(API_TINYGRAIL_INITIAL(monoId))

    let data = {
      ...LIST_EMPTY
    }
    if (result.data.State === 0) {
      data = {
        ...LIST_EMPTY,
        list: result.data.Value.Items.map(item => ({
          id: item.InitialId,
          avatar: item.Avatar,
          userId: item.UserId,
          state: item.State,
          nickName: HTMLDecode(item.NickName),
          name: item.Name,
          amount: item.Amount,
          lastIndex: item.LastIndex
        })),
        pagination: paginationOnePage,
        _loaded: getTimestamp()
      }
    }

    const key = 'initial'
    this.setState({
      [key]: {
        [monoId]: data
      }
    })

    return Promise.resolve(data)
  }

  /** 资金日志 */
  fetchBalance = async () => {
    const result = await this.fetch(API_TINYGRAIL_BALANCE())

    let data = {
      ...LIST_EMPTY
    }
    if (result.data.State === 0) {
      data = {
        ...LIST_EMPTY,
        list: result.data.Value.Items.map(item => ({
          id: item.Id,
          balance: item.Balance,
          change: item.Change,
          time: item.LogTime,
          charaId: item.RelatedId,
          desc: item.Description
        })),
        pagination: paginationOnePage,
        _loaded: getTimestamp()
      }
    }

    const key = 'balance'
    this.setState({
      [key]: data
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** 董事会 */
  fetchUsers = async (monoId: MonoId) => {
    const result = await this.fetch(API_TINYGRAIL_USERS(monoId))

    let data: any = []
    if (result.data.State === 0) {
      data = {
        ...LIST_EMPTY,
        list: result.data.Value.Items.map(item => ({
          id: item.Id,
          nickName: item.Nickname,
          avatar: item.Avatar,
          balance: item.Balance,
          name: item.Name,
          lastIndex: item.LastIndex,
          lastActiveDate: item.LastActiveDate
        })),
        pagination: paginationOnePage,
        total: result.data.Value.TotalItems,
        _loaded: getTimestamp()
      }
    }

    const key = 'users'
    this.setState({
      [key]: {
        [monoId]: data
      }
    })

    return Promise.resolve(data)
  }

  /** 用户圣殿 */
  fetchTemple = async (hash: UserId = this.hash) => {
    const result = await this.fetch(API_TINYGRAIL_TEMPLE(hash))

    let data = {
      ...LIST_EMPTY
    }
    if (result.data.State === 0) {
      data = {
        ...LIST_EMPTY,
        list: result.data.Value.Items.map(item => ({
          id: item.CharacterId,
          assets: item.Assets, // 用户献祭剩余资产
          cLevel: item.CharacterLevel,
          cover: item.Cover,
          level: item.Level,
          name: item.Name,
          rank: item.CharacterRank,
          rate: Number(toFixed(item.Rate, 2)),
          sacrifices: item.Sacrifices, // 用户献祭总数
          starForces: item.CharacterStarForces,
          stars: item.CharacterStars
        })),
        _loaded: getTimestamp()
      }
    }

    const key = 'temple'
    this.setState({
      [key]: {
        [hash]: data
      }
    })
    if (hash === this.hash) {
      this.save(key)
    }

    return Promise.resolve(data)
  }

  /** 用户资产概览信息 */
  fetchCharaAll = async (hash = this.hash) => {
    const result = await this.fetch(API_TINYGRAIL_CHARA_ALL(hash))

    let data = {
      ...LIST_EMPTY
    }
    if (result.data.State === 0) {
      data = {
        ...LIST_EMPTY,
        list: result.data.Value.Items.map(item => ({
          id: item.Id,
          icon: item.Icon,
          name: item.Name,
          current: item.Current,
          state: item.State,
          sacrifices: item.Sacrifices,
          total: item.Total,
          bonus: item.Bonus,
          rate: Number(toFixed(item.Rate, 2)),
          level: item.Level,
          marketValue: item.MarketValue,
          change: item.Change,
          fluctuation: item.Fluctuation,
          rank: item.Rank,
          stars: item.Stars,
          starForces: item.StarForces
        })),
        _loaded: getTimestamp()
      }
    }

    const key = 'charaAll'
    this.setState({
      [key]: {
        [hash]: data
      }
    })
    if (hash === this.hash) {
      this.save(key)
    }

    return Promise.resolve(data)
  }

  /** 角色圣殿 */
  fetchCharaTemple = async (id = 0) => {
    const result = await this.fetch(API_TINYGRAIL_CHARA_TEMPLE(id))

    let data = {
      ...LIST_EMPTY
    }
    if (result.data.State === 0) {
      data = {
        ...LIST_EMPTY,
        list: result.data.Value.map(item => ({
          avatar: item.Avatar,
          id: item.CharacterId,
          cover: item.Cover,
          name: item.Name,
          nickname: item.Nickname,
          level: item.Level,
          assets: item.Assets,
          sacrifices: item.Sacrifices
        })),
        _loaded: getTimestamp()
      }
    }

    const key = 'charaTemple'
    this.setState({
      [key]: {
        [id]: data
      }
    })
    // this.save(key)

    return Promise.resolve(data)
  }

  /** 可拍卖信息 */
  fetchValhallChara = async (id = 0) => {
    const result = await this.fetch(API_TINYGRAIL_VALHALL_CHARA(id))

    let data = {}
    const { State, Value } = result.data
    if (State === 0) {
      data = {
        amount: Value.Amount,
        price: Value.Price,
        _loaded: getTimestamp()
      }
    }

    const key = 'valhallChara'
    this.setState({
      [key]: {
        [id]: data
      }
    })

    return Promise.resolve(data)
  }

  /** 上周拍卖记录 */
  fetchAuctionList = async (id = 0) => {
    const result = await this.fetch(API_TINYGRAIL_AUCTION_LIST(id))

    let data = {
      ...LIST_EMPTY
    }
    if (result.data.State === 0) {
      data = {
        ...LIST_EMPTY,
        list: result.data.Value.map(item => ({
          id: item.CharacterId,
          name: item.Username,
          nickname: item.Nickname,
          time: (item.Bid || '').replace('T', ' ').substring(2, 16),
          price: item.Price,
          amount: item.Amount,
          state: item.State
        })),
        _loaded: getTimestamp()
      }
    }

    const key = 'auctionList'
    this.setState({
      [key]: {
        [id]: data
      }
    })

    return Promise.resolve(data)
  }

  /** 角色发行价 */
  fetchIssuePrice = async (id: Id = 0) => {
    // 发行价一旦有数据就不会改变, 不需要再请求
    if (this.issuePrice[id]) return this.issuePrice[id]

    const result = await this.fetch(API_TINYGRAIL_ISSUE_PRICE(id))
    let data = 0
    if (result.data.State === 0) {
      if (result.data.Value.length) {
        data = result.data.Value[0].Begin
      }
    }

    const key = 'issuePrice'
    this.setState({
      [key]: {
        [id]: data
      }
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** 最近圣殿 */
  fetchTempleLast = async (refresh: boolean = false) => {
    const { list, pagination } = this.templeLast
    let page: number
    if (refresh) {
      page = 1
    } else {
      page = pagination.page + 1
    }

    const result = await this.fetch(API_TINYGRAIL_TEMPLE_LAST(page))
    let data: any = {
      ...LIST_EMPTY
    }
    const { State, Value } = result.data
    if (State === 0) {
      const _list = Value.Items.map(item => ({
        id: item.CharacterId,
        avatar: item.Avatar,
        userId: item.Name,
        cover: item.Cover,
        name: item.CharacterName,
        nickname: item.Nickname,
        level: item.Level,
        rate: Number(toFixed(item.Rate, 2))
      }))
      data = {
        list: refresh ? _list : [...list, ..._list],
        pagination: refresh
          ? {
              page: 1,
              pageTotal: 100
            }
          : {
              ...pagination,
              page: pagination.page + 1
            },
        _loaded: getTimestamp()
      }
    }

    const key = 'templeLast'
    this.setState({
      [key]: data
    })

    return Promise.resolve(data)
  }

  /** 卖一推荐 (从市场查找) */
  fetchAdvanceList = async () => {
    let Value = []
    let result

    // @tofixed 这个接口坏了, 不支持limit > 100
    for (let i = 1; i <= 5; i += 1) {
      result = await this.fetch(
        API_TINYGRAIL_LIST('recent', i, 80),
        undefined,
        undefined,
        true
      )

      if (result.data.State !== 0) break
      Value = [...Value, ...result.data.Value.Items]
    }

    let data: any = {
      ...LIST_EMPTY
    }
    let list = []
    const iconsCache = toJS(this.state.iconsCache)
    list = Value
      // 规则
      .filter(
        item => item.Asks >= 10 && calculateRate(item.Rate, item.Rank, item.Stars) >= 2
      )
      .map(item => {
        const id = item.CharacterId || item.Id
        if (item.Icon) {
          iconsCache[id] = item.Icon
        }
        return {
          id,
          name: item.Name,
          icon: item.Icon,
          asks: item.Asks,
          current: item.Current,
          bonus: item.Bonus,
          level: item.Level,
          rate: toFixed(item.Rate, 2),
          rank: item.Rank || 0,
          stars: item.Stars || 0
        }
      })
    this.updateIconsCache(iconsCache)

    if (list.length) {
      try {
        // 循环请求获取第一卖单价
        await queue(
          list.map(item => () => {
            throttleInfo(
              // @ts-ignore
              `${list.findIndex(i => item.id === i.id) + 1} / ${list.length}`
            )
            return this.fetchDepth(item.id)
          })
        )

        // 合并数据并计算分数
        data = {
          list: list
            .map(item => {
              const { asks } = this.depth(item.id)

              // 列表有时有卖单数, 但是实际又没有人卖, 过滤冰山价格
              if (!asks.length || asks[0].price === 0) {
                return null
              }

              return {
                ...item,
                firstAsks: asks[0].price,
                firstAmount: asks[0].amount,
                mark: toFixed(
                  (calculateRate(item.rate, item.rank, item.stars) / asks[0].price) *
                    100,
                  1
                )
              }
            })
            .filter(item => !!item && parseFloat(item.mark) > 1)
            .sort((a, b) => parseFloat(b.mark) - parseFloat(a.mark)),
          pagination: paginationOnePage,
          _loaded: getTimestamp()
        }
        info('分析完毕')
      } catch (error) {
        console.error(NAMESPACE, 'fetchAdvanceList', error)
      }
    }

    const key = 'advanceList'
    this.setState({
      [key]: data
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** 买一推荐 (从自己持仓中查找) */
  fetchAdvanceBidList = async () => {
    await this.fetchMyCharaAssets()
    const { chara = LIST_EMPTY } = this.myCharaAssets

    let data: any = {
      ...LIST_EMPTY
    }

    // 为了筛选掉过多数据, 当前价钱 > 20
    const list = chara.list.filter(item => item.bids && item.current >= 20)
    if (list.length) {
      try {
        // 循环请求获取第一买单价
        await queue(
          list.map(item => () => {
            throttleInfo(
              // @ts-ignore
              `${list.findIndex(i => item.id === i.id) + 1} / ${list.length}`
            )
            return this.fetchDepth(item.id)
          })
        )

        // 合并数据并计算分数
        data = {
          list: list
            .map(item => {
              const { bids } = this.depth(item.id)

              // 列表有时有买单数, 但是实际又没有人买
              if (!bids.length) {
                return null
              }

              const markRate = calculateRate(
                item.rate,
                (item.rank > 500 ? 500 : item.rank) || 500,
                item.stars
              )
              return {
                id: item.id,
                name: item.name,
                icon: item.icon,
                bids: item.bids,
                current: item.current,
                bonus: item.bonus,
                level: item.level,
                amount: item.state,
                firstBids: bids[0].price,
                firstAmount: bids[0].amount,
                mark: toFixed(bids[0].price / (markRate || 1), 1),
                rate: toFixed(item.Rate, 2),
                rank: item.Rank || 0,
                stars: item.Stars || 0
              }
            })
            .filter(item => !!item)
            .sort((a, b) => parseFloat(b.mark) - parseFloat(a.mark)),
          pagination: paginationOnePage,
          _loaded: getTimestamp()
        }
        info('分析完毕')
      } catch (error) {
        console.error(NAMESPACE, 'fetchAdvanceBidList', error)
      }
    }

    const key = 'advanceBidList'
    this.setState({
      [key]: data
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** 拍卖推荐 (从英灵殿中查找) */
  fetchAdvanceAuctionList = async () => {
    const result = await this.fetch(
      API_TINYGRAIL_VALHALL_LIST(1, TINYGRAIL_ASSETS_LIMIT)
    )
    const { State, Value } = result.data

    let data: any = {
      ...LIST_EMPTY
    }
    if (State === 0) {
      data = {
        list: Value.Items.filter(item => parseFloat(item.Rate) >= 2 && item.State >= 80)
          .map(item => ({
            id: item.Id,
            name: item.Name,
            icon: item.Icon,
            current: item.Current,
            bonus: item.Bonus,
            level: item.Level,
            amount: item.State,
            rate: toFixed(item.Rate, 2),
            rank: item.Rank || 0,
            stars: item.Stars || 0,
            mark:
              item.Rank > 500
                ? 0
                : toFixed(
                    (calculateRate(item.Rate, item.Rank, item.Stars) / item.Price) *
                      100,
                    1
                  )
          }))
          .filter(item => parseFloat(item.mark) >= 5)
          .sort((a, b) => parseFloat(b.mark) - parseFloat(a.mark)),
        pagination: paginationOnePage,
        _loaded: getTimestamp()
      }
    }

    const key = 'advanceAuctionList'
    this.setState({
      [key]: data
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** 拍卖推荐 (按假设角色是通天塔250名来计算, 从英灵殿中查找) */
  fetchAdvanceAuctionList2 = async () => {
    const result = await this.fetch(
      API_TINYGRAIL_VALHALL_LIST(1, TINYGRAIL_ASSETS_LIMIT)
    )
    const { State, Value } = result.data

    let data: any = {
      ...LIST_EMPTY
    }
    if (State === 0) {
      data = {
        list: Value.Items.filter(
          item => parseFloat(item.Rate) >= 2 && item.State >= 80 && item.Level >= 3
        )
          .map(item => ({
            id: item.Id,
            name: item.Name,
            icon: item.Icon,
            current: item.Current,
            bonus: item.Bonus,
            level: item.Level,
            amount: item.State,
            rate: toFixed(item.Rate, 2),
            rank: item.Rank || 0,
            stars: item.Stars || 0,
            mark: toFixed(
              (calculateRate(
                item.Rate,
                (item.Rank > 500 ? 500 : item.Rank) || 500,
                item.Stars
              ) /
                item.Price) *
                100,
              1
            )
          }))
          .filter(item => parseFloat(item.mark) >= 5)
          .sort((a, b) => parseFloat(b.mark) - parseFloat(a.mark)),
        pagination: paginationOnePage,
        _loaded: getTimestamp()
      }
    }

    const key = 'advanceAuctionList2'
    this.setState({
      [key]: data
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** 献祭推荐 (从自己持仓中查找) */
  fetchAdvanceSacrificeList = async () => {
    await this.fetchMyCharaAssets()
    const { chara = LIST_EMPTY } = this.myCharaAssets
    const data = {
      list: chara.list
        .filter(item => {
          const templeRate = parseFloat(item.rate) * (item.level + 1) * 0.3
          return templeRate > item.rate
        })
        .map(item => ({
          ...item,
          mark: toFixed(parseFloat(item.rate) * (item.level + 1) * 0.3 - item.rate, 1)
        }))
        .sort((a, b) => parseFloat(b.mark) - parseFloat(a.mark)),
      pagination: paginationOnePage,
      _loaded: getTimestamp()
    }

    const key = 'advanceSacrificeList'
    this.setState({
      [key]: data
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /**
   */
  fetchAdvanceGuidepost = async () => {
    // const result = await this.fetch(API_TINYGRAIL_LIST('mvc', 1, 1000))
    // if (result.data.State === 0) {
    //   const list = result.data.Value.map(item => ({
    //     id: item.Id,
    //     change: item.Change,
    //     current: item.Current,
    //     level: item.Level,
    //     name: item.Name,
    //     icon: item.Icon
    //   }))
    //     .sort((a, b) => b.current - a.current)
    //     .filter((item, index) => index < 200)
    //   let data = {
    //     ...LIST_EMPTY
    //   }
    //   if (list.length) {
    //     try {
    //       // 循环请求获取第一买单价
    //       await queue(
    //         list.map(item => () => {
    //           throttleInfo(
    //             `${list.findIndex(i => item.id === i.id) + 1} / ${list.length}`
    //           )
    //           return this.fetchDepth(item.id)
    //         })
    //       )
    //       // 合并数据并计算分数
    //       data = {
    //         list: list
    //           .map(item => {
    //             const { bids } = this.depth(item.id)
    //             // 列表有时有买单数, 但是实际又没有人买
    //             if (!bids.length) {
    //               return null
    //             }
    //             return {
    //               id: item.id,
    //               name: item.name,
    //               current: item.current,
    //               level: item.level,
    //               firstBids: parseInt(bids[0].price),
    //               firstAmount: bids[0].amount,
    //               secondBids: bids[1] ? parseInt(bids[1].price) : 0,
    //               secondAmount: bids[1] ? parseInt(bids[1].amount) : 0
    //             }
    //           })
    //           .filter(item => !!item)
    //           .sort((a, b) => b.firstBids - a.firstBids)
    //           .filter((item, index) => index < 50),
    //         pagination: paginationOnePage,
    //         _loaded: getTimestamp()
    //       }
    //       info('分析完毕')
    //     } catch (error) {
    //       console.error(NAMESPACE, 'fetchAdvanceBidList', error)
    //     }
    //   }
    // }
    // const key = 'advanceBidList'
    // this.setState({
    //   [key]: data
    // })
    // this.save(key)
    // return Promise.resolve(data)
  }

  /** 低价股 (从市场查找) */
  fetchAdvanceState = async () => {
    const key = 'advanceState'
    await this.fetchValhallList()

    const list = this.valhallList.list.filter(item => item.current <= 15)
    if (list.length) {
      try {
        // 循环请求获取第一卖单价
        await queue(
          list.map(item => () => {
            throttleInfo(
              // @ts-ignore
              `${list.findIndex(i => item.id === i.id) + 1} / ${list.length}`
            )
            return this.fetchDepth(item.id)
          })
        )

        // 合并数据并计算分数
        const data = {
          list: list
            .map(item => {
              const { asks } = this.depth(item.id)

              // 列表有时有卖单数, 但是实际又没有人卖, 过滤冰山价格
              if (!asks.length || asks[0].price === 0) {
                return null
              }

              return {
                ...item,
                firstAsks: asks[0].price,
                firstAmount: asks[0].amount
              }
            })
            .filter(item => !!item)
            .sort((a, b) => a.firstAsks - b.firstAsks),
          pagination: paginationOnePage,
          _loaded: getTimestamp()
        }
        info('分析完毕')

        this.setState({
          [key]: data
        })
        this.save(key)
      } catch (error) {
        console.error(NAMESPACE, 'fetchAdvanceState', error)
      }
    }

    return Promise.resolve(this.state[key])
  }

  /** 通天塔(α) */
  fetchStar = async (page = 1, limit = 50) => {
    const result = await this.fetch(API_TINYGRAIL_STAR(page, limit))

    let data = {
      ...LIST_EMPTY
    }

    if (result.data.State === 0) {
      data = {
        ...LIST_EMPTY,
        list: result.data.Value.map(item => ({
          id: item.Id,
          name: item.Name,
          icon: item.Icon,
          current: Number(toFixed(item.Current, 2)),
          bonus: item.Bonus,
          rate: Number(toFixed(item.Rate, 2)),
          level: item.Level,
          rank: item.Rank,
          starForces: item.StarForces,
          stars: item.Stars
        })),
        pagination: paginationOnePage,
        _loaded: getTimestamp()
      }
    }

    const key = 'star'
    this.setState({
      [key]: {
        [`${page}|${limit}`]: data
      }
    })
    this.save(key)

    return Promise.resolve(data)
  }

  /** 通天塔(α)记录 */
  fetchStarLogs = async (page = 1, limit = 100) => {
    const result = await this.fetch(API_TINYGRAIL_STAR_LOGS(page, limit))

    let data = {
      ...LIST_EMPTY
    }

    if (result.data.State === 0) {
      data = {
        ...LIST_EMPTY,
        list: result.data.Value.Items.map(item => ({
          id: item.Id,
          monoId: item.CharacterId,
          fromMonoId: item.FromCharacterId,
          name: item.CharacterName,
          icon: item.Icon,
          amount: item.Amount,
          oldRank: item.OldRank,
          rank: item.Rank,
          userName: item.Nickname,
          userId: item.UserName,
          time: lastDate(getTimestamp(item.LogTime.replace('T', ' ')))
        })),
        pagination: paginationOnePage,
        _loaded: getTimestamp()
      }
    }

    const key = 'starLogs'
    this.setState({
      [key]: data
    })

    return Promise.resolve(data)
  }

  // -------------------- page --------------------
  updateCookie = cookie => {
    this.setState({
      cookie
    })
    this.save('cookie')
  }

  updateIconsCache = iconsCache => {
    this.setState({
      iconsCache
    })
    this.save('iconsCache')
  }

  updateCharacters = characters => {
    this.setState({
      characters
    })
    this.save('characters')
  }

  updateWebViewShow = show => {
    if (SDK >= 36) {
      this.setState({
        _webview: true
      })
      return
    }

    this.setState({
      _webview: show
    })
  }

  /** 更新献祭少于500未成塔的数据 */
  updateMyTemples = (id, sacrifices = 0) => {
    if (!this.hash || sacrifices > 500) {
      return
    }

    const key = 'temple'
    const temple = toJS(this[key]())
    const index = temple.list.findIndex(item => item.id == id)
    if (index === -1) {
      return
    }

    // 少于0删除项
    if (sacrifices === 0) {
      const { name } = temple.list[index]
      info(`${name} 已耗尽`)

      temple.list.splice(index, 1)
    } else {
      temple.list[index].sacrifices = sacrifices
    }

    temple._loaded = getTimestamp()
    this.setState({
      [key]: {
        [this.hash]: temple
      }
    })
    this.save(key)
  }

  /** 更新我的持仓角色 */
  updateMyCharaAssets = (id, state, sacrifices) => {
    // 只有这里能检测到未献祭满500角色的圣殿资产变化, 需要联动圣殿资产里面的对应项
    this.updateMyTemples(id, sacrifices)

    const key = 'myCharaAssets'
    const { chara = {} } = this[key] as any
    const { list = [] } = chara
    const index = list.findIndex(item => item.monoId === parseInt(id))
    if (index !== -1) {
      const newList = toJS(list)

      // 没有活股需要删除项
      if (state <= 0) {
        newList.splice(index, 1)
      } else {
        newList[index].state = state
        newList[index].sacrifices = sacrifices
      }

      this.setState({
        [key]: {
          ...this[key],
          chara: {
            ...this[key].chara,
            list: newList
          }
        }
      })
      this.save(key)
      return true
    }
    return false
  }

  /** 批量根据角色id更新我的持仓角色 */
  batchUpdateMyCharaAssetsByIds = async ids => {
    for (const id of ids) {
      const { amount, sacrifices } = (await this.fetchUserLogs(id)) as any
      this.updateMyCharaAssets(id, amount, sacrifices)
    }
  }

  /** 批量根据角色id更新我的圣殿资产 */
  batchUpdateTemplesByIds = async ids => {
    if (!this.hash) return

    const key = 'temple'
    const temple = toJS(this[key]())
    let flag

    for (const id of ids) {
      const { list } = await this.fetchCharaTemple(id)
      const find = list.find(item => item.name == this.hash)
      if (find?.id) {
        const index = temple.list.findIndex(item => item.id == find.id)
        if (index !== -1) {
          flag = true

          // 若sacrifices为0需要删除项
          // @notice 其实这里不可能找到sacrifices为0的圣殿, 只能通过updateMyCharaAssets信息找到
          if (find.sacrifices === 0) {
            const { name } = temple.list[index]
            info(`${name} 已耗尽`)

            temple.list.splice(index, 1)
          } else {
            temple.list[index].assets = find.assets
            temple.list[index].sacrifices = find.sacrifices
          }
        }
      }
    }

    if (flag) {
      this.setState({
        [key]: {
          [this.hash]: temple
        }
      })
      this.save(key)
    }
  }

  /** 切换是否显示角色股价预览 */
  toggleStockPreview = () => {
    const { _stockPreview } = this.state
    this.setState({
      _stockPreview: !_stockPreview
    })
  }

  /** 切换收藏 */
  toggleCollect = (monoId: MonoId) => {
    const { collected } = this.state

    const _collected = {
      ...collected
    }

    if (_collected[monoId]) {
      _collected[monoId] = 0
    } else {
      _collected[monoId] = getTimestamp()
    }
    this.setState({
      collected: _collected
    })

    this.save('collected')
  }

  // -------------------- action --------------------
  /** 买入 */
  doBid = async ({ monoId, price, amount, isIce }) => {
    const result = await this.fetch(
      API_TINYGRAIL_BID(monoId, price, amount, isIce),
      true
    )
    if (result.data.State === 0) {
      return true
    }
    return false
  }

  /** 卖出 */
  doAsk = async ({ monoId, price, amount, isIce }): Promise<any> => {
    const result = await this.fetch(
      API_TINYGRAIL_ASK(monoId, price, amount, isIce),
      true
    )
    if (result.data.State === 0) return true
    return false
  }

  /** 取消买入 */
  doCancelBid = async ({ id }) => {
    const result = await this.fetch(API_TINYGRAIL_CANCEL_BID(id), true)
    if (result.data.State === 0) {
      return true
    }
    return false
  }

  /** 取消卖出 */
  doCancelAsk = async ({ id }) => {
    const result = await this.fetch(API_TINYGRAIL_CANCEL_ASK(id), true)
    if (result.data.State === 0) {
      return true
    }
    return false
  }

  /** 参与 ICO */
  doJoin = async ({ id, amount }) => {
    const result = await this.fetch(API_TINYGRAIL_JOIN(id, amount), true)
    if (result.data.State === 0) {
      return true
    }
    return false
  }

  /** 资产重组 */
  doSacrifice = async ({ monoId, amount, isSale }) => {
    const { data } = await this.fetch(
      API_TINYGRAIL_SACRIFICE(monoId, amount, isSale),
      true
    )
    return data
  }

  /** 拍卖 */
  doAuction = async ({ monoId, price, amount }) => {
    const { data } = await this.fetch(
      API_TINYGRAIL_AUCTION(monoId, price, amount),
      true
    )
    return data
  }

  /** 取消拍卖 */
  doAuctionCancel = async ({ id }) => {
    const { data } = await this.fetch(API_TINYGRAIL_AUCTION_CANCEL(id), true)
    return data
  }

  /** 刮刮乐 */
  doLottery = async (isBonus2 = false) => {
    const { data } = await this.fetch(
      isBonus2 ? API_TINYGRAIL_SCRATCH2() : API_TINYGRAIL_SCRATCH(),
      true
    )
    return data
  }

  /** 检测今天刮刮乐刮了多少次 */
  doCheckDaily = async () => {
    const { data } = await this.fetch(API_TINYGRAIL_DAILY_COUNT())
    return data
  }

  /** 每周分红 */
  doBonus = async () => {
    const { data } = await this.fetch(API_TINYGRAIL_BONUS(), true)
    return data
  }

  /** 每日签到 */
  doBonusDaily = async () => {
    const { data } = await this.fetch(API_TINYGRAIL_BONUS_DAILY(), true)
    return data
  }

  /** 节日福利 */
  doBonusHoliday = async () => {
    const { data } = await this.fetch(API_TINYGRAIL_BONUS_HOLIDAY(), true)
    return data
  }

  /** 新年快乐 */
  doSend = async (count = 10000) => {
    const { data } = await this.fetch(
      `https://tinygrail.com/api/event/send/sukaretto/${count}`,
      true
    )
    return data
  }

  /** 使用道具 */
  doMagic = async ({
    monoId,
    type,
    toMonoId,
    amount,
    isTemple
  }: {
    monoId?: MonoId
    type?: TinygrailMagic
    toMonoId?: Id
    amount?: number
    isTemple?: boolean
  }) => {
    const { data } = await this.fetch(
      API_TINYGRAIL_MAGIC(monoId, type, toMonoId, amount, isTemple),
      true
    )
    return data
  }

  /** 查询 */
  doSearch = ({ keyword }) => this.fetch(API_TINYGRAIL_SEARCH(keyword), true)

  /** Link */
  doLink = async ({ monoId, toMonoId }) => {
    const { data } = await this.fetch(API_TINYGRAIL_LINK(monoId, toMonoId), true)
    return data
  }

  /** 启动 ICO */
  doICO = async ({ monoId }) => {
    const { data } = await this.fetch(API_TINYGRAIL_INIT(monoId), true)
    return data
  }

  /** 灌注星之力 */
  doStarForces = async ({ monoId, amount }) => {
    const { data } = await this.fetch(API_TINYGRAIL_CHARA_STAR(monoId, amount), true)
    return data
  }
}

const tinygrailStore = new TinygrailStore()
setTimeout(() => {
  tinygrailStore.init('cookie')
  tinygrailStore.init('advance')
  tinygrailStore.init('hash')
}, 2000)

export default tinygrailStore
