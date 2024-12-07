/*
 * @Author: czy0729
 * @Date: 2024-09-16 20:17:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-07 15:24:39
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

  /** wiki 修订历史 */
  @computed get wiki() {
    return subjectStore.wiki(this.subjectId)
  }

  @computed get url() {
    return `${HOST}/subject/${this.subjectId}/edit`
  }

  @computed get hm() {
    return [this.url, 'SubjectWiki']
  }
}
