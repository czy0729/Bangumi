/*
 * @Author: czy0729
 * @Date: 2020-03-22 14:18:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 00:42:27
 */
import { observable, computed } from 'mobx'
import { usersStore, userStore } from '@stores'
import store from '@utils/store'
import { HTML_USERS_BLOGS } from '@constants/html'

export default class ScreenBlogs extends store {
  state = observable({
    _loaded: false
  })

  init = () => this.refresh()

  // -------------------- fetch --------------------
  refresh = () => this.fetchBlogs(true)

  fetchBlogs = refresh =>
    usersStore.fetchBlogs(
      {
        userId: this.userId
      },
      refresh
    )

  // -------------------- get --------------------
  @computed get userId() {
    const { userId } = this.params
    return userId || userStore.myId
  }

  @computed get blogs() {
    return usersStore.blogs(this.userId)
  }

  @computed get url() {
    return HTML_USERS_BLOGS(this.userId)
  }
}
