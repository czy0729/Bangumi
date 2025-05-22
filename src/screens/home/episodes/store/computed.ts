/*
 * @Author: czy0729
 * @Date: 2024-08-24 07:09:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-24 07:10:54
 */
import { computed } from 'mobx'
import { subjectStore } from '@stores'
import { HOST } from '@constants'
import State from './state'

export default class Computed extends State {
  @computed get subjectId() {
    return this.params.subjectId
  }

  @computed get subject() {
    return subjectStore.subject(this.subjectId)
  }

  /** 条目章节 */
  @computed get eps() {
    if (this.subject._loaded) {
      const { filterEps = 0 } = this.params
      if (filterEps) return (this.subject.eps || []).filter((_item, index) => index > filterEps)

      return this.subject.eps || []
    }

    return []
  }

  @computed get url() {
    return `${HOST}/subject/${this.subjectId}/ep`
  }

  @computed get hm() {
    return [this.url, 'Episodes'] as const
  }
}
