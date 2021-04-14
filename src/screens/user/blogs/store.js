/*
 * @Author: czy0729
 * @Date: 2020-03-22 14:18:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-22 18:40:14
 */
import { observable, computed } from 'mobx'
import { usersStore } from '@stores'
import store from '@utils/store'

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
    return userId
  }

  @computed get blogs() {
    return usersStore.blogs(this.userId)
  }
}
