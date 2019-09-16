/*
 * 小圣杯
 * @Author: czy0729
 * @Date: 2019-08-24 23:18:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-16 18:55:06
 */
import { observable, computed } from 'mobx'
import axios from 'axios'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { LIST_EMPTY } from '@constants'
import {
  API_TINYGRAIL_CHARAS,
  API_TINYGRAIL_LIST,
  API_TINYGRAIL_RICH,
  API_TINYGRAIL_CHARTS,
  API_TINYGRAIL_DEPTH,
  API_TINYGRAIL_HASH,
  API_TINYGRAIL_ASSETS,
  API_TINYGRAIL_CHARA_ASSETS,
  API_TINYGRAIL_USER_CHARA,
  API_TINYGRAIL_BID,
  API_TINYGRAIL_ASK,
  API_TINYGRAIL_CANCEL_BID,
  API_TINYGRAIL_CANCEL_ASK
} from '@constants/api'
import {
  NAMESPACE,
  INIT_CHARACTERS_ITEM,
  INIT_KLINE_ITEM,
  INIT_DEPTH_ITEM,
  INIT_ASSETS,
  INIT_CHARA_ASSETS,
  INIT_USER_LOGS
} from './init'

class Tinygrail extends store {
  state = observable({
    // 人物数据
    characters: {
      // [monoId]: INIT_CHARACTERS_ITEM
    },

    // 总览列表
    mvc: LIST_EMPTY,
    mrc: LIST_EMPTY,
    mfc: LIST_EMPTY,
    mvi: LIST_EMPTY,
    mpi: LIST_EMPTY,
    rai: LIST_EMPTY,
    recent: LIST_EMPTY,
    tnbc: LIST_EMPTY,
    nbc: LIST_EMPTY,

    // 番市首富
    rich: LIST_EMPTY, // INIT_RICH_ITEM

    // K线
    kline: {
      // [monoId]: INIT_KLINE_ITEM
    },

    // 深度图
    depth: {
      // [monoId]: INIT_DEPTH_ITEM
    },

    // 用户唯一标识
    hash: '',

    // 用户资产
    assets: INIT_ASSETS,

    // 用户资产概览信息
    charaAssets: {
      // [hash]: INIT_CHARA_ASSETS
    },

    // 用户挂单和交易记录
    userLogs: {
      // [monoId]: INIT_USER_LOGS
    }
  })

  async init() {
    const res = Promise.all([
      this.getStorage('characters', NAMESPACE),
      this.getStorage('kline', NAMESPACE),
      this.getStorage('depth', NAMESPACE),
      this.getStorage('hash', NAMESPACE),
      this.getStorage('assets', NAMESPACE),
      this.getStorage('charaAssets', NAMESPACE)
    ])
    const state = await res
    this.setState({
      characters: state[0] || {},
      kline: state[1] || {},
      depth: state[2] || {},
      hash: state[3] || '',
      assets: state[4] || INIT_ASSETS,
      charaAssets: state[5] || {}
    })

    return res
  }

  // -------------------- get --------------------
  characters(id) {
    return (
      computed(() => this.state.characters[id]).get() || INIT_CHARACTERS_ITEM
    )
  }

  list(key = 'recent') {
    return computed(() => this.state[key]).get() || LIST_EMPTY
  }

  @computed get rich() {
    return this.state.rich || LIST_EMPTY
  }

  kline(id) {
    return computed(() => this.state.kline[id]).get() || INIT_KLINE_ITEM
  }

  depth(id) {
    return computed(() => this.state.depth[id]).get() || INIT_DEPTH_ITEM
  }

  @computed get hash() {
    return this.state.hash
  }

  @computed get assets() {
    return this.state.assets
  }

  charaAssets(hash) {
    return (
      computed(() => this.state.charaAssets[hash]).get() || INIT_CHARA_ASSETS
    )
  }

  userLogs(id) {
    return computed(() => this.state.userLogs[id]).get() || INIT_USER_LOGS
  }

  // -------------------- fetch --------------------
  /**
   * 人物数据
   */
  fetchCharacters = async ids => {
    const result = await fetch(API_TINYGRAIL_CHARAS(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(ids)
    }).then(response => response.json())

    const { characters } = this.state
    const data = {
      ...characters
    }

    if (result.State === 0) {
      result.Value.forEach(item => {
        data[item.Id] = {
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
          _loaded: getTimestamp()
        }
      })
    }
    const key = 'characters'
    this.setState({
      [key]: data
    })
    this.setStorage(key, undefined, NAMESPACE)

    return Promise.resolve(data)
  }

  /**
   * 总览列表
   */
  fetchList = async (key = 'recent') => {
    const result = await fetch(API_TINYGRAIL_LIST(key), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(response => response.json())

    let data = {
      ...LIST_EMPTY
    }
    if (result.State === 0) {
      data = {
        ...LIST_EMPTY,
        list: (result.Value.Items || result.Value).map(item => ({
          id: item.CharacterId || item.Id,
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
          bonus: item.Bonus
        })),
        pagination: {
          page: 1,
          pageTotal: 1
        },
        _loaded: getTimestamp()
      }
    }

    this.setState({
      [key]: data
    })
    // this.setStorage(key, undefined, NAMESPACE)

    return Promise.resolve(data)
  }

  /**
   * 番市首富
   */
  fetchRich = async () => {
    axios.defaults.withCredentials = true
    const result = await axios({
      method: 'get',
      url: API_TINYGRAIL_RICH(),
      responseType: 'json'
    })

    let data = {
      ...LIST_EMPTY
    }
    if (result.data.State === 0) {
      data = {
        ...LIST_EMPTY,
        list: result.data.Value.map(item => ({
          avatar: item.Avatar,
          nickname: item.Nickname,
          userId: item.Name,
          assets: item.Assets.toFixed(2),
          total: item.TotalBalance.toFixed(2),
          principal: item.Principal,
          lastActiveDate: item.LastActiveDate,
          lastIndex: item.LastIndex
        })),
        pagination: {
          page: 1,
          pageTotal: 1
        },
        _loaded: getTimestamp()
      }
    }

    const key = 'rich'
    this.setState({
      [key]: data
    })

    return Promise.resolve(data)
  }

  /**
   * K线原始数据
   */
  fetchKline = async monoId => {
    const result = await fetch(API_TINYGRAIL_CHARTS(monoId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(response => response.json())

    const data = {
      id: monoId,
      data: []
    }
    if (result.State === 0) {
      data._loaded = getTimestamp()
      data.data = result.Value.map(item => ({
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
    this.setStorage(key, undefined, NAMESPACE)

    return Promise.resolve(data)
  }

  /**
   * 深度图
   */
  fetchDepth = async monoId => {
    const result = await fetch(API_TINYGRAIL_DEPTH(monoId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(response => response.json())

    const data = {
      ...INIT_DEPTH_ITEM
    }
    if (result.State === 0) {
      data._loaded = getTimestamp()
      data.asks = result.Value.Asks.map(item => ({
        price: item.Price,
        amount: item.Amount
      }))
      data.bids = result.Value.Bids.map(item => ({
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
    this.setStorage(key, undefined, NAMESPACE)

    return Promise.resolve(data)
  }

  /**
   * 用户唯一标识
   */
  fetchHash = async () => {
    axios.defaults.withCredentials = true
    const result = await axios({
      method: 'get',
      url: API_TINYGRAIL_HASH(),
      responseType: 'json'
    })

    let data = ''
    if (result.data.State === 0) {
      data = result.data.Value.Hash
    }

    const key = 'hash'
    this.setState({
      [key]: data
    })
    this.setStorage(key, undefined, NAMESPACE)

    return Promise.resolve(data)
  }

  /**
   * 资产信息
   */
  fetchAssets = async () => {
    axios.defaults.withCredentials = true
    const result = await axios({
      method: 'get',
      url: API_TINYGRAIL_ASSETS(),
      responseType: 'json'
    })

    let data = {
      ...INIT_ASSETS
    }
    if (result.data.State === 0) {
      data = {
        id: result.data.Value.Id,
        balance: result.data.Value.Balance,
        _loaded: getTimestamp()
      }
    }

    const key = 'assets'
    this.setState({
      [key]: data
    })
    this.setStorage(key, undefined, NAMESPACE)

    return Promise.resolve(data)
  }

  /**
   * 用户资产概览信息
   */
  fetchCharaAssets = async hash => {
    axios.defaults.withCredentials = true
    const result = await axios({
      method: 'get',
      url: API_TINYGRAIL_CHARA_ASSETS(hash),
      responseType: 'json'
    })

    const data = {
      ...INIT_CHARA_ASSETS
    }
    if (result.data.State === 0) {
      data._loaded = getTimestamp()
      data.id = result.data.Value.Id
      data.balance = result.data.Value.Balance
      data.characters = result.data.Value.Characters.map(item => ({
        id: item.Id,
        icon: item.Icon,
        name: item.Name,
        current: item.Current,
        state: item.State,
        total: item.Total
      }))
      data.initials = result.data.Value.Initials.map(item => ({
        id: item.Id,
        icon: item.Icon,
        name: item.Name,
        current: 0,
        state: item.State,
        total: item.Total
      }))
    }

    const key = 'charaAssets'
    this.setState({
      [key]: {
        [hash]: data
      }
    })
    this.setStorage(key, undefined, NAMESPACE)

    return Promise.resolve(data)
  }

  /**
   * 用户挂单和交易记录
   */
  fetchUserLogs = async monoId => {
    axios.defaults.withCredentials = true
    const result = await axios({
      method: 'get',
      url: API_TINYGRAIL_USER_CHARA(monoId),
      responseType: 'json'
    })

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
          time: item.Begin
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
          time: item.Begin
        })),
        _loaded: getTimestamp()
      }
    }

    const key = 'userLogs'
    this.setState({
      [key]: {
        [monoId]: data
      }
    })

    return Promise.resolve(data)
  }

  // -------------------- action --------------------
  /**
   * 买入
   */
  doBid = async ({ monoId, price, amount }) => {
    axios.defaults.withCredentials = true
    const result = await axios({
      method: 'post',
      url: API_TINYGRAIL_BID(monoId, price, amount),
      responseType: 'json'
    })

    if (result.data.State === 0) {
      return true
    }

    return false
  }

  /**
   * 卖出
   */
  doAsk = async ({ monoId, price, amount }) => {
    axios.defaults.withCredentials = true
    const result = await axios({
      method: 'post',
      url: API_TINYGRAIL_ASK(monoId, price, amount),
      responseType: 'json'
    })

    if (result.data.State === 0) {
      return true
    }

    return false
  }

  /**
   * 取消买入
   */
  doCancelBid = async ({ id }) => {
    axios.defaults.withCredentials = true
    const result = await axios({
      method: 'post',
      url: API_TINYGRAIL_CANCEL_BID(id),
      responseType: 'json'
    })

    if (result.data.State === 0) {
      return true
    }

    return false
  }

  /**
   * 取消卖出
   */
  doCancelAsk = async ({ id }) => {
    axios.defaults.withCredentials = true
    const result = await axios({
      method: 'post',
      url: API_TINYGRAIL_CANCEL_ASK(id),
      responseType: 'json'
    })

    if (result.data.State === 0) {
      return true
    }

    return false
  }
}

export default new Tinygrail()
