/*
 * 小圣杯
 * @Author: czy0729
 * @Date: 2019-08-24 23:18:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-13 02:30:37
 */
import { observable, computed } from 'mobx'
import axios from 'axios'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { LIST_EMPTY } from '@constants'
import {
  API_TINYGRAIL_CHARAS,
  API_TINYGRAIL_MVC,
  API_TINYGRAIL_MRC,
  API_TINYGRAIL_MFC,
  API_TINYGRAIL_MVI,
  API_TINYGRAIL_MPI,
  API_TINYGRAIL_RAI,
  API_TINYGRAIL_RECENT,
  API_TINYGRAIL_TNBC,
  API_TINYGRAIL_NBC,
  API_TINYGRAIL_CHARTS,
  API_TINYGRAIL_DEPTH,
  API_TINYGRAIL_ASSETS,
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

    // K线
    kline: {
      // [monoId]: INIT_KLINE_ITEM
    },

    // 深度图
    depth: {
      // [monoId]: INIT_DEPTH_ITEM
    },

    // 用户资产
    assets: INIT_ASSETS,

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
      this.getStorage('assets', NAMESPACE)
    ])
    const state = await res
    this.setState({
      characters: state[0] || {},
      kline: state[1] || {},
      depth: state[2] || {},
      assets: state[3] || INIT_ASSETS
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

  kline(id) {
    return computed(() => this.state.kline[id]).get() || INIT_KLINE_ITEM
  }

  depth(id) {
    return computed(() => this.state.depth[id]).get() || INIT_DEPTH_ITEM
  }

  @computed get assets() {
    return this.state.assets
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
    let api = ''
    switch (key) {
      case 'mvc':
        api = API_TINYGRAIL_MVC()
        break
      case 'mrc':
        api = API_TINYGRAIL_MRC()
        break
      case 'mfc':
        api = API_TINYGRAIL_MFC()
        break
      case 'mvi':
        api = API_TINYGRAIL_MVI()
        break
      case 'mpi':
        api = API_TINYGRAIL_MPI()
        break
      case 'rai':
        api = API_TINYGRAIL_RAI()
        break
      case 'tnbc':
        api = API_TINYGRAIL_TNBC()
        break
      case 'nbc':
        api = API_TINYGRAIL_NBC()
        break
      default:
        api = API_TINYGRAIL_RECENT()
        break
    }

    const result = await fetch(api, {
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
   * 用户资产
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
