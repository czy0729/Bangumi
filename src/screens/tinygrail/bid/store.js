/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-29 17:39:44
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { info, feedback } from '@utils/ui'
import {
  relation,
  SORT_SC,
  SORT_GX,
  SORT_GXB,
  SORT_SDGX,
  SORT_SDGXB,
  SORT_DJ,
  SORT_HYD,
  SORT_SCJ,
  SORT_FHL,
  SORT_DQJ,
  SORT_DQZD,
  SORT_XFJL
} from '../_/utils'

export const tabs = [
  {
    title: '我的买单',
    key: 'bid'
  },
  {
    title: '我的卖单',
    key: 'asks'
  },
  {
    title: '我的拍卖',
    key: 'auction'
  }
]
export const sortDS = [
  SORT_SC,
  SORT_HYD,
  SORT_GX,
  SORT_GXB,
  SORT_SDGX,
  SORT_SDGXB,
  SORT_DQJ,
  SORT_SCJ,
  SORT_DQZD,
  SORT_DJ,
  SORT_XFJL,
  SORT_FHL
]

export default class ScreenTinygrailBid extends store {
  state = observable({
    page: 0,
    level: '',
    sort: '',
    direction: '',
    _loaded: false
  })

  init = async () => {
    const { type } = this.params
    const page = tabs.findIndex(item => item.key === type)
    this.setState({
      page,
      _loaded: true
    })
    this.fetchList(tabs[page].key)
  }

  // -------------------- fetch --------------------
  fetchList = key => {
    if (key === 'bid') {
      return tinygrailStore.fetchBid()
    }

    if (key === 'asks') {
      return tinygrailStore.fetchAsks()
    }

    return tinygrailStore.fetchAuction()
  }

  // -------------------- get --------------------
  list(key = 'bid') {
    return computed(() => relation(tinygrailStore.list(key))).get()
  }

  // -------------------- page --------------------
  onChange = page => {
    if (page === this.state.page) {
      return
    }

    t('我的委托.标签页切换', {
      page
    })

    this.setState({
      page,
      sort: '',
      direction: ''
    })
    this.tabChangeCallback(page)
  }

  tabChangeCallback = page => {
    const { key } = tabs[page]
    const { _loaded } = this.list(key)
    if (!_loaded) {
      this.fetchList(key)
    }
  }

  onLevelSelect = level => {
    this.setState({
      level
    })
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

      t('我的委托.排序', {
        sort: nextSort,
        direction: nextDirection
      })

      this.setState({
        sort: nextSort,
        direction: nextDirection
      })
    } else {
      t('我的委托.排序', {
        sort: item,
        direction: 'down'
      })

      this.setState({
        sort: item,
        direction: 'down'
      })
    }
  }

  // -------------------- action --------------------
  doAuctionCancel = async id => {
    if (!id) {
      return
    }

    t('我的委托.取消拍卖', {
      id
    })

    const result = await tinygrailStore.doAuctionCancel({
      id
    })
    feedback()

    if (!result) {
      info('取消失败')
      return
    }

    info('已取消')
    this.fetchList()
  }
}
