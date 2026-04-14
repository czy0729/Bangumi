/*
 * @Author: czy0729
 * @Date: 2024-11-11 09:50:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-14 09:49:21
 */
import { computed } from 'mobx'
import { systemStore, userStore } from '@stores'
import State from './state'
import { NAMESPACE } from './ds'

import type { SubjectId } from '@types'

export default class Computed extends State {
  @computed get userId() {
    return (
      this.params.userId || userStore.usersInfo(userStore.myUserId).username || userStore.myUserId
    )
  }

  /** 页面唯一命名空间 */
  @computed get namespace() {
    return `${NAMESPACE}|${this.userId}`
  }

  relates(subjectId: SubjectId) {
    return computed(() => {
      return this.state.relates[subjectId]
    }).get()
  }

  subjects(subjectId: SubjectId) {
    return computed(() => {
      return this.state.subjects[subjectId]
    }).get()
  }

  @computed get list() {
    const { type } = this.state
    const list = this.state.list[type]
    if (!systemStore.setting.likeCollected) {
      const set = new Set(this.state.collectedSubjectIds[type])
      return list.filter(item => !set.has(item.id))
    }

    return list
  }
}
