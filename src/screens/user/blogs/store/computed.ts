/*
 * @Author: czy0729
 * @Date: 2024-09-14 06:47:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 06:48:56
 */
import { computed } from 'mobx'
import { usersStore, userStore } from '@stores'
import { HTML_USERS_BLOGS } from '@constants'
import State from './state'

export default class Computed extends State {
  @computed get userId() {
    return this.params.userId || userStore.myId
  }

  @computed get blogs() {
    return usersStore.blogs(this.userId)
  }

  @computed get url() {
    return HTML_USERS_BLOGS(this.userId)
  }

  @computed get hm() {
    return [this.url, 'Blogs'] as const
  }
}
