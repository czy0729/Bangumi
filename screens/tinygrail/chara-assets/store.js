/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-05 16:27:20
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'
import {
  SORT_CGS,
  SORT_CCJZ,
  SORT_HYD,
  SORT_SCJ,
  SORT_FHL,
  SORT_DQJ,
  SORT_DQZD,
  SORT_XFJL
} from '../_/utils'

export const tabs = [
  {
    title: '人物',
    key: 'chara'
  },
  {
    title: 'ICO',
    key: 'ico'
  },
  {
    title: '圣殿',
    key: 'temple'
  }
]
export const sortDS = [
  SORT_CGS,
  SORT_CCJZ,
  SORT_HYD,
  SORT_SCJ,
  SORT_FHL,
  SORT_DQJ,
  SORT_DQZD,
  SORT_XFJL
]
const namespace = 'ScreenTinygrailCharaAssets'

export default class ScreenTinygrailCharaAssets extends store {
  state = observable({
    page: 0,
    sort: '',
    direction: '', // void | down | up
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })

    this.fetchMyCharaAssets()
    return res
  }

  // -------------------- fetch --------------------
  fetchMyCharaAssets = () => tinygrailStore.fetchMyCharaAssets()

  fetchTemple = () => tinygrailStore.fetchTemple()

  // -------------------- get --------------------
  @computed get myCharaAssets() {
    return tinygrailStore.myCharaAssets
  }

  @computed get temple() {
    return tinygrailStore.temple()
  }

  // -------------------- page --------------------
  onChange = (item, page) => {
    if (page === this.state.page) {
      return
    }

    this.setState({
      page
    })
    this.setStorage(undefined, undefined, namespace)
    this.tabChangeCallback(page)
  }

  tabChangeCallback = page => {
    const { _loaded } = this.myCharaAssets
    if (!_loaded) {
      this.fetchMyCharaAssets()
    }

    if (page === 2) {
      this.fetchTemple()
    }
  }

  onSortPress = item => {
    const { sort, direction } = this.state
    if (item === sort) {
      let nextSort = item
      let nextDirection = 'down'
      if (direction === 'down') {
        nextDirection = 'up'
      } else if (direction === 'up') {
        nextSort = ''
        nextDirection = ''
      }

      this.setState({
        sort: nextSort,
        direction: nextDirection
      })
    } else {
      this.setState({
        sort: item,
        direction: 'down'
      })
    }

    this.setStorage(undefined, undefined, namespace)
  }
}
