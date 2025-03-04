/*
 * @Author: czy0729
 * @Date: 2023-04-26 14:38:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-04 19:46:39
 */
import { toJS } from 'mobx'
import { getTimestamp, HTMLDecode, info, lastDate, toFixed } from '@utils'
import { queue } from '@utils/fetch'
import axios from '@utils/thirdParty/axios'
import {
  API_TINYGRAIL_ASSETS,
  API_TINYGRAIL_AUCTION_LIST,
  API_TINYGRAIL_AUCTION_STATUS,
  API_TINYGRAIL_BALANCE,
  API_TINYGRAIL_CHARA,
  API_TINYGRAIL_CHARA_ALL,
  API_TINYGRAIL_CHARA_ASKS,
  API_TINYGRAIL_CHARA_ASSETS,
  API_TINYGRAIL_CHARA_BID,
  API_TINYGRAIL_CHARA_POOL,
  API_TINYGRAIL_CHARA_TEMPLE,
  API_TINYGRAIL_CHARTS,
  API_TINYGRAIL_DEPTH,
  API_TINYGRAIL_FANTASY_LIST,
  API_TINYGRAIL_HASH,
  API_TINYGRAIL_INITIAL,
  API_TINYGRAIL_ISSUE_PRICE,
  API_TINYGRAIL_ITEMS,
  API_TINYGRAIL_LIST,
  API_TINYGRAIL_MY_AUCTION_LIST,
  API_TINYGRAIL_MY_CHARA_ASSETS,
  API_TINYGRAIL_MY_TEMPLE,
  API_TINYGRAIL_REFINE_TEMPLE,
  API_TINYGRAIL_RICH,
  API_TINYGRAIL_STAR,
  API_TINYGRAIL_STAR_LOGS,
  API_TINYGRAIL_TEMPLE,
  API_TINYGRAIL_TEMPLE_LAST,
  API_TINYGRAIL_TEST,
  API_TINYGRAIL_TOP_WEEK,
  API_TINYGRAIL_USER_CHARA,
  API_TINYGRAIL_USER_CHARA_TOTAL,
  API_TINYGRAIL_USER_TEMPLE_TOTAL,
  API_TINYGRAIL_USERS,
  API_TINYGRAIL_VALHALL_CHARA,
  API_TINYGRAIL_VALHALL_LIST,
  LIST_EMPTY,
  TINYGRAIL_ASSETS_LIMIT
} from '@constants'
import { Id, MonoId, UserId } from '@types'
import Computed from './computed'
import {
  INIT_ASSETS,
  INIT_AUCTION_STATUS,
  INIT_CHARA_ASSETS,
  INIT_DEPTH_ITEM,
  INIT_MY_CHARA_ASSETS,
  INIT_USER_LOGS,
  NAMESPACE
} from './init'
import { CHARA_ITEM, CHARA_TEMPLE_ITEM, REFINE_TEMPLE_ITEM, STAR_LOGS_ITEM } from './mock'
import { calculateRate, throttleInfo, toCharacter } from './utils'
import { defaultKey, defaultSort, paginationOnePage } from './ds'
import { ListKey } from './types'

export default class Fetch extends Computed {
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

  /** 小圣杯统一请求入口 */
  // @ts-expect-error
  fetch = (url: string, isPost?: boolean, data?: any, showError?: boolean) => {
    // @ts-expect-error
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

    // @ts-expect-error
    return axios(config).catch(() => {
      if (showError) info('接口出错')
    })
  }

  /**
   * 人物数据
   *  - 20201017 API_TINYGRAIL_CHARAS => API_TINYGRAIL_CHARA
   *  - 20210306 optimize
   * @param {*} ids
   */
  fetchCharacters = async (ids: any[]) => {
    const key = 'characters'
    const result = await this.fetch(API_TINYGRAIL_CHARA(Number(ids[0])))

    if (result.data.State === 0) {
      const data = {}
      const iconsCache = {}

      const target = Array.isArray(result.data.Value) ? result.data.Value : [result.data.Value]
      target.forEach((item: typeof CHARA_ITEM) => {
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
   *  - 自行添加顺序 index, 以支持二次排序显示
   *  - 20210306 optimize
   */
  fetchList = async (key: ListKey = defaultKey) => {
    const result = await this.fetch(API_TINYGRAIL_LIST(key))
    if (result.data.State === 0) {
      const iconsCache = {}
      const data = {
        ...LIST_EMPTY,
        list: (result.data.Value.Items || result.data.Value).map(
          (
            item: {
              CharacterId: any
              Id: any
              End: any
            },
            index: number
          ) => {
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
          }
        ),
        pagination: paginationOnePage,
        _loaded: getTimestamp()
      }

      this.updateIconsCache(iconsCache)
      this.setState({
        [key]: data
      })
      this.save(key)
    }

    return this.state[key]
  }

  /** 精炼排行 */
  fetchRefineTemple = async () => {
    const result = await this.fetch(API_TINYGRAIL_REFINE_TEMPLE())

    let data = {
      ...LIST_EMPTY
    }
    if (result.data.State === 0) {
      data = {
        ...LIST_EMPTY,
        list: result.data.Value.Items.map((item: typeof REFINE_TEMPLE_ITEM) => ({
          monoId: item.CharacterId,
          cover: item.Cover,
          name: item.CharacterName,
          userId: item.Name,
          userName: item.Nickname,
          refine: item.Refine,
          assets: item.Assets,
          sacrifices: item.Sacrifices,
          lastActive: item.LastActive
        })),
        pagination: paginationOnePage,
        _loaded: getTimestamp()
      }

      const key = 'refine_temple'
      this.setState({
        [key]: data
      })
    }

    return data
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
        .filter(item => item.Price !== 0)
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

    return data
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
          const { bonus, current, fluctuation, icon, id, level, rank, rate, sacrifices, stars } =
            character

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
          const { bonus, current, fluctuation, icon, id, level, rank, rate, sacrifices, stars } =
            character

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
  fetchUserLogs = async (monoId: Id) => {
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

    return data
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

    return data
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
    const result = await this.fetch(API_TINYGRAIL_AUCTION_STATUS(), true, [parseInt(monoId)])

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
              starForces: item.StarForces || 0,
              listedDate: item.ListedDate || ''
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

    return data
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

  /** 角色奖池 */
  fetchCharaPool = async (monoId: MonoId) => {
    const result = await this.fetch(API_TINYGRAIL_CHARA_POOL(monoId))

    const key = 'charaPool'
    if (result.data.State === 0) {
      const value = result.data.Value || 0
      this.setState({
        [key]: {
          [monoId]: value
        }
      })
    }

    return this[key](monoId)
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

          /** 用户献祭剩余资产 */
          assets: item.Assets,
          cLevel: item.CharacterLevel,
          cover: item.Cover,
          level: item.Level,
          name: item.Name,
          rank: item.CharacterRank,
          rate: Number(toFixed(item.Rate, 2)),

          /** 用户献祭总数 */
          sacrifices: item.Sacrifices,
          starForces: item.CharacterStarForces,
          stars: item.CharacterStars,
          refine: item.Refine
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

  /** 我的某角色圣殿 */
  fetchMyTemple = async (id: Id = 0) => {
    const result = await this.fetch(API_TINYGRAIL_MY_TEMPLE(this.hash, id))

    let data = {}
    if (result.data.State === 0) {
      const item = result.data.Value.Items[0]
      data = {
        avatar: item.Avatar,
        id: item.CharacterId,
        cover: item.Cover,
        name: item.Name,
        nickname: item.Nickname,
        level: item.Level,
        assets: item.Assets,
        sacrifices: item.Sacrifices,
        refine: item.Refine,
        _loaded: getTimestamp()
      }
    }

    const key = 'myTemple'
    this.setState({
      [key]: {
        [id]: data
      }
    })
    return data
  }

  /** 角色圣殿 */
  fetchCharaTemple = async (id: Id = 0) => {
    const result = await this.fetch(API_TINYGRAIL_CHARA_TEMPLE(id))

    let data = {
      ...LIST_EMPTY
    }
    if (result.data.State === 0) {
      data = {
        ...LIST_EMPTY,
        list: result.data.Value.map((item: typeof CHARA_TEMPLE_ITEM) => ({
          avatar: item.Avatar,
          id: item.CharacterId,
          cover: item.Cover,
          name: item.Name,
          nickname: item.Nickname,
          level: item.Level,
          assets: item.Assets,
          sacrifices: item.Sacrifices,
          refine: item.Refine
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
    return data
  }

  /** 可拍卖信息 */
  fetchValhallChara = async (id: Id = 0) => {
    const result = await this.fetch(API_TINYGRAIL_VALHALL_CHARA(id))

    let data: {
      amount?: number
      price?: number
      _loaded?: number
    } = {}
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

    return data
  }

  /** 上周拍卖记录 */
  fetchAuctionList = async (id: Id = 0) => {
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

    return data
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
      result = await this.fetch(API_TINYGRAIL_LIST('recent', i, 80), undefined, undefined, true)

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
      .filter(item => item.Asks >= 10 && calculateRate(item.Rate, item.Rank, item.Stars) >= 2)
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
              // @ts-expect-error
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
                  (calculateRate(item.rate, item.rank, item.stars) / asks[0].price) * 100,
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
              // @ts-expect-error
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
    const result = await this.fetch(API_TINYGRAIL_VALHALL_LIST(1, TINYGRAIL_ASSETS_LIMIT))
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
                : toFixed((calculateRate(item.Rate, item.Rank, item.Stars) / item.Price) * 100, 1)
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
    const result = await this.fetch(API_TINYGRAIL_VALHALL_LIST(1, TINYGRAIL_ASSETS_LIMIT))
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
              (calculateRate(item.Rate, (item.Rank > 500 ? 500 : item.Rank) || 500, item.Stars) /
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
              // @ts-expect-error
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
        list: result.data.Value.Items.map((item: typeof STAR_LOGS_ITEM) => ({
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
          time: lastDate(getTimestamp(item.LogTime.replace('T', ' '))),
          type: item.Type
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

  /** 预测股息 */
  fetchTest = async () => {
    const result = await this.fetch(API_TINYGRAIL_TEST())
    const key = 'test'
    if (result.data.State === 0) {
      this.setState({
        [key]: {
          ...result.data.Value,
          _loaded: getTimestamp()
        }
      })
      this.save(key)
    }

    return this[key]
  }
}
