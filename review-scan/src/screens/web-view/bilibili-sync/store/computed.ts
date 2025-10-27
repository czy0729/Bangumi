/*
 * @Author: czy0729
 * @Date: 2024-09-14 15:42:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 15:44:38
 */
import { computed } from 'mobx'
import { userStore } from '@stores'
import { asc, desc } from '@utils'
import { Id, SubjectId } from '@types'
import State from './state'

export default class Computed extends State {
  @computed get userId() {
    return userStore.usersInfo(userStore.myUserId).username || userStore.myUserId
  }

  @computed get data() {
    const { data, bottom } = this.state
    return data.list
      .slice()
      .sort((a, b) => asc(bottom[a.id] || 0, bottom[b.id] || 0))
      .sort((a, b) => desc(a.subjectId ? 1 : 0, b.subjectId ? 1 : 0))
  }

  review(mediaId: Id) {
    return computed(() => {
      return this.state.reviews[mediaId]
    }).get()
  }

  collection(subjectId: SubjectId) {
    return computed(() => {
      return this.state.collections[subjectId]
    }).get()
  }
}
