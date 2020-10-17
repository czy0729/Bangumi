/*
 * @Author: czy0729
 * @Date: 2020-10-17 17:00:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-18 03:23:29
 */
import { computed } from 'mobx'
import { subjectStore } from '@stores'
import store from '@utils/store'
import { HOST } from '@constants'

export default class ScreenEpisodes extends store {
  init = () => subjectStore.fetchSubject(this.subjectId)

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId } = this.params
    return subjectId
  }

  @computed get subject() {
    return subjectStore.subject(this.subjectId)
  }

  @computed get eps() {
    if (this.subject._loaded) {
      return this.subject.eps || []
    }
    return []
  }

  @computed get url() {
    return `${HOST}/subject/${this.subjectId}/ep`
  }
}
