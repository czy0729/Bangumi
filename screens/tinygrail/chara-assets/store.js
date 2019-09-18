/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-18 23:53:26
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
const namespace = 'ScreenTinygrailCharaAssets'

export default class ScreenTinygrailCharaAssets extends store {
  state = observable({
    page: 0,
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
}
