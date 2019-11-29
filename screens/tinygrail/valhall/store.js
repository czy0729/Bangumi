/*
 * @Author: czy0729
 * @Date: 2019-11-29 21:58:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-29 22:12:21
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'
import { SORT_GX, SORT_HYD, SORT_DQJ, SORT_DQZD, SORT_XFJL } from '../_/utils'

export const sortDS = [SORT_HYD, SORT_GX, SORT_DQJ, SORT_DQZD, SORT_XFJL]
const namespace = 'ScreenTinygrailValhall'

export default class ScreenTinygrailValhall extends store {
  state = observable({
    sort: '',
    direction: '',
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })

    this.fetchValhallList()

    return res
  }

  // -------------------- fetch --------------------
  fetchValhallList = () => tinygrailStore.fetchValhallList()

  // -------------------- get --------------------
  @computed get valhallList() {
    return tinygrailStore.valhallList
  }

  // -------------------- page --------------------
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
