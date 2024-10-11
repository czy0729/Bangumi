/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:54:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-12 01:09:16
 */
import { computed } from 'mobx'
import { collectionStore, usersStore, userStore } from '@stores'
import State from './state'

export default class Computed extends State {
  @computed get userId() {
    return this.params.userId || userStore.myId
  }

  @computed get collections() {
    return collectionStore.userCollections(this.userId, this.state.subjectType, this.state.type)
  }

  @computed get users() {
    return usersStore.users(this.userId)
  }

  @computed get key() {
    return `list`
  }
}
