/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:49:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-10 20:50:38
 */
import { observable, computed } from 'mobx'
import { userStore, tinygrailStore } from '@stores'
import store from '@utils/store'

export default class ScreenDeal extends store {
  state = observable({
    info: ''
  })

  init = async () => {}

  // -------------------- get --------------------
  @computed get userCookie() {
    return userStore.userCookie
  }

  @computed get assets() {
    return tinygrailStore.assets
  }

  // -------------------- action --------------------
}
