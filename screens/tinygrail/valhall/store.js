/*
 * @Author: czy0729
 * @Date: 2019-11-29 21:58:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-03 04:02:06
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import {
  SORT_SC,
  SORT_GX,
  SORT_GXB,
  SORT_SDGX,
  SORT_SDGXB,
  SORT_HYD,
  SORT_DQJ,
  SORT_DQZD,
  SORT_XFJL,
  SORT_DJ
} from '../_/utils'

export const sortDS = [
  SORT_SC,
  SORT_HYD,
  SORT_GX,
  SORT_GXB,
  SORT_SDGX,
  SORT_SDGXB,
  SORT_DQJ,
  SORT_DQZD,
  SORT_DJ,
  SORT_XFJL
]
const namespace = 'ScreenTinygrailValhall'

export default class ScreenTinygrailValhall extends store {
  state = observable({
    sort: '',
    direction: '',
    go: '资产重组',
    _loaded: false
  })

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - _loaded > 60

    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) {
      this.fetchValhallList()
    }

    return res
  }

  // -------------------- fetch --------------------
  fetchValhallList = () => tinygrailStore.fetchValhallList()

  // -------------------- get --------------------
  @computed get valhallList() {
    return tinygrailStore.valhallList
  }

  // -------------------- page --------------------
  onSelectGo = title => {
    t('英灵殿.设置前往', {
      title
    })

    this.setState({
      go: title
    })
    this.setStorage(undefined, undefined, namespace)
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

      t('英灵殿.排序', {
        sort: nextSort,
        direction: nextDirection
      })

      this.setState({
        sort: nextSort,
        direction: nextDirection
      })
    } else {
      t('英灵殿.排序', {
        sort: item,
        direction: 'down'
      })

      this.setState({
        sort: item,
        direction: 'down'
      })
    }

    this.setStorage(undefined, undefined, namespace)
  }
}
