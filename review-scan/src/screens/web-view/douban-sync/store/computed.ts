/*
 * @Author: czy0729
 * @Date: 2024-09-16 14:10:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 14:12:43
 */
import { computed } from 'mobx'
import { userStore } from '@stores'
import { asc, desc } from '@utils'
import { SubjectId } from '@types'
import State from './state'

export default class Computed extends State {
  @computed get doubanId() {
    const { doubanId } = this.state
    if (!doubanId) return ''

    if (doubanId.includes('://')) return doubanId.split('/people/')?.[1]?.split('/')?.[0]

    return doubanId
  }

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

  @computed get matchCount() {
    let count = 0
    this.state.data.list.forEach(item => {
      if (item.subjectId) count += 1
    })
    return count
  }

  collection(subjectId: SubjectId) {
    return computed(() => {
      return this.state.collections[subjectId]
    }).get()
  }

  totalEps(subjectId: SubjectId) {
    return computed(() => {
      return this.state.totalEps[subjectId] || 0
    }).get()
  }
}
