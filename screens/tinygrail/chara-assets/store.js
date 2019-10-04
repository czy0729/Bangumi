/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-04 03:18:25
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'

export const tabs = [
  {
    title: '人物',
    key: 'chara'
  },
  {
    title: 'ICO',
    key: 'ico'
  }
]
export const sortDS = [
  {
    label: '持股数',
    value: 'cgs'
  },
  {
    label: '持仓价值',
    value: 'ccjz'
  },
  {
    label: '活跃度',
    value: 'czsj'
  },
  {
    label: '市场价',
    value: 'fhze'
  },
  {
    label: '发行量',
    value: 'fhl'
  },
  {
    label: '当前价',
    value: 'dqj'
  },
  {
    label: '当前涨跌',
    value: 'dqzd'
  },
  {
    label: '新番奖励',
    value: 'xfjl'
  }
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

  // -------------------- get --------------------
  @computed get myCharaAssets() {
    return tinygrailStore.myCharaAssets
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

  tabChangeCallback = () => {
    const { _loaded } = this.myCharaAssets
    if (!_loaded) {
      this.fetchMyCharaAssets()
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
