/*
 * 小圣杯
 * @Author: czy0729
 * @Date: 2019-08-24 23:18:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-25 23:25:26
 */
import { observable, computed } from 'mobx'
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
  API_TINYGRAIL_RECENT
} from '@constants/api'
import { NAMESPACE, INIT_CHARACTERS_ITEM } from './init'

class Tinygrail extends store {
  state = observable({
    // 人物数据
    characters: {
      // [characterId]: INIT_CHARACTERS_ITEM
    },

    mvc: LIST_EMPTY,
    mrc: LIST_EMPTY,
    mfc: LIST_EMPTY,
    mvi: LIST_EMPTY,
    mpi: LIST_EMPTY,
    rai: LIST_EMPTY,
    recent: LIST_EMPTY
  })

  async init() {
    const res = Promise.all([
      this.getStorage('characters', NAMESPACE),
      this.getStorage('mvc', NAMESPACE),
      this.getStorage('mrc', NAMESPACE),
      this.getStorage('mfc', NAMESPACE),
      this.getStorage('mvi', NAMESPACE),
      this.getStorage('mpi', NAMESPACE),
      this.getStorage('rai', NAMESPACE),
      this.getStorage('recent', NAMESPACE)
    ])
    const state = await res
    this.setState({
      characters: state[0] || {},
      mvc: state[1] || LIST_EMPTY,
      mrc: state[2] || LIST_EMPTY,
      mfc: state[3] || LIST_EMPTY,
      mvi: state[4] || LIST_EMPTY,
      mpi: state[5] || LIST_EMPTY,
      rai: state[6] || LIST_EMPTY,
      recent: state[7] || LIST_EMPTY
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
   * 最高市值
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
          icon: item.Icon
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
    this.setStorage(key, undefined, NAMESPACE)

    return Promise.resolve(data)
  }
}

export default new Tinygrail()
