/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:54:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 23:44:26
 */
import { computed } from 'mobx'
import { collectionStore, usersStore, userStore } from '@stores'
import { getSPAParams, omit } from '@utils'
import { HTML_USER_COLLECTIONS, URL_SPA } from '@constants'
import State from './state'

export default class Computed extends State {
  @computed get userId() {
    return this.params.userId || userStore.myId
  }

  @computed get users() {
    return usersStore.users(this.userId)
  }

  @computed get key() {
    return `list|${this.state.numColumns}`
  }

  @computed get collections() {
    return collectionStore.userCollections(this.userId, this.state.subjectType, this.state.type)
  }

  @computed get userCollectionsTags() {
    return collectionStore.userCollectionsTags(this.userId, this.state.subjectType, this.state.type)
  }

  @computed get data() {
    const { limit, nsfw } = this.state
    if (!limit && nsfw) return this.collections

    let { list } = this.collections
    if (!nsfw) list = list.filter(item => item.cover && !item.cover.includes('no_icon_subject'))
    if (!limit) {
      return {
        ...this.collections,
        list
      }
    }

    return {
      ...this.collections,
      list: list.slice(0, limit)
    }
  }

  @computed get url() {
    return HTML_USER_COLLECTIONS(
      this.userId,
      this.state.subjectType,
      this.state.type,
      this.state.order,
      this.state.tag
    )
  }

  @computed get shareUrl() {
    return `${URL_SPA}/${getSPAParams('Milestone', {
      ...omit(this.state, ['show', '_loaded']),
      userId: this.userId
    })}`
  }
}
