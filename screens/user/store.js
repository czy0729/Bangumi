/*
 * @Author: czy0729
 * @Date: 2019-04-26 20:31:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-27 01:33:27
 */
import { observable, computed } from 'mobx'
import { userStore } from '@stores'
import store from '@utils/store'

export default class Store extends store {
  state = observable({
    expand: {
      在看: true,
      看过: false,
      想看: false,
      搁置: false,
      抛弃: false
    }
  })

  // -------------------- get --------------------
  @computed get userCollections() {
    return userStore.userCollections()
  }

  init = async () => {
    const state = await this.getStorage()
    if (state) {
      this.setState(state)
    }
    userStore.fetchUserCollections()
  }

  // -------------------- page --------------------
  toggleSection = title => {
    const { expand } = this.state
    this.setState({
      expand: {
        ...expand,
        [title]: !expand[title]
      }
    })
    this.setStorage()
  }

  // -------------------- action --------------------
}
