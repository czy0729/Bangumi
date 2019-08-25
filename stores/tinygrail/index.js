/*
 * 小圣杯
 * @Author: czy0729
 * @Date: 2019-08-24 23:18:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-25 14:23:59
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { API_TINYGRAIL_CHARAS } from '@constants/api'
import { NAMESPACE, INIT_CHARACTERS_ITEM } from './init'

class Tinygrail extends store {
  state = observable({
    characters: {
      // [characterId]: INIT_CHARACTERS_ITEM
    }
  })

  async init() {
    const res = Promise.all([this.getStorage('characters', NAMESPACE)])
    const state = await res
    this.setState({
      characters: state[0] || {}
    })

    return res
  }

  // -------------------- get --------------------
  characters(id) {
    return (
      computed(() => this.state.characters[id]).get() || INIT_CHARACTERS_ITEM
    )
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
          users: item.Users,
          name: item.Name,
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
}

export default new Tinygrail()
