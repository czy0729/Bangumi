/*
 * @Author: czy0729
 * @Date: 2020-10-17 17:00:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-05-05 22:23:40
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
      const { filterEps = 0 } = this.params
      if (filterEps) {
        return (this.subject.eps || []).filter(
          (item, index) => index > filterEps
        )
      }

      return this.subject.eps || []
    }
    return []
  }

  @computed get url() {
    return `${HOST}/subject/${this.subjectId}/ep`
  }
}
