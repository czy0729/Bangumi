/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:54:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-04 21:45:00
 */
import { computed } from 'mobx'
import { collectionStore, usersStore, userStore } from '@stores'
import { getSPAParams, omit } from '@utils'
import { HTML_USER_COLLECTIONS, URL_SPA } from '@constants'
import State from './state'
import { filterByCover, filterByScore, precomputeItems } from './utils'

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
    return collectionStore.userCollectionsForMilestone(
      this.userId,
      this.state.subjectType,
      this.state.type
    )
  }

  @computed get userCollectionsTags() {
    return collectionStore.userCollectionsTagsForMilestone(
      this.userId,
      this.state.subjectType,
      this.state.type
    )
  }

  @computed get data() {
    const { limit, nsfw, score, subjectType } = this.state
    let { list } = this.collections

    // 分步过滤，每步返回新数组
    list = filterByCover(list, nsfw)
    list = filterByScore(list, score)

    // 限制数量
    if (limit) {
      list = list.slice(0, limit)
    }

    // 预计算 Item 所需数据，避免渲染时重复计算
    const precomputed = precomputeItems(list, subjectType)

    return {
      ...this.collections,
      list: precomputed
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

  @computed get hm() {
    return [`milestone/${this.userId}`, 'Milestone'] as const
  }
}
