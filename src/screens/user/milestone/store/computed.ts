/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:54:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-24 07:14:22
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
    const { limit, nsfw, score } = this.state
    let { list } = this.collections

    if (!nsfw) {
      list = list.filter(item => item.cover && !item.cover.includes('no_icon_subject'))
    }

    if (score && score !== '全部') {
      list = list.filter(item => {
        const itemScore = item.score ? Number(item.score) : 0

        if (score === '未评分') {
          return !item.score || item.score === '0' || item.score === ''
        }

        if (score.includes('-')) {
          const [min, max] = score.split('-').map(Number)
          return itemScore >= min && itemScore <= max
        }

        return itemScore === Number(score)
      })
    }

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

  @computed get hm() {
    return [`milestone/${this.userId}`, 'Milestone'] as const
  }
}
