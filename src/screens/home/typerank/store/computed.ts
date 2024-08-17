/*
 * @Author: czy0729
 * @Date: 2024-08-18 04:07:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 04:35:58
 */
import { computed } from 'mobx'
import { subjectStore } from '@stores'
import { SubjectId } from '@types'
import State from './state'

export default class Computed extends State {
  @computed get tag() {
    return this.params.tag || ''
  }

  @computed get type() {
    return this.params.type || 'anime'
  }

  @computed get subjectId() {
    return this.params.subjectId || 0
  }

  subject(id: SubjectId) {
    return computed(() => subjectStore.subjectV2(id)).get()
  }

  subjectOSS(id: SubjectId) {
    return computed(() => this.state.subjects[`subject_${id}`] || {}).get()
  }
}
