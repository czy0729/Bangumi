/*
 * @Author: czy0729
 * @Date: 2020-10-17 17:00:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:16:24
 */
import { computed } from 'mobx'
import { subjectStore } from '@stores'
import store from '@utils/store'
import { HOST } from '@constants'
import { Params } from './types'

export default class ScreenEpisodes extends store<null> {
  params: Params

  init = () => {
    return subjectStore.fetchSubject(this.subjectId)
  }

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId } = this.params
    return subjectId
  }

  @computed get subject() {
    return subjectStore.subject(this.subjectId)
  }

  /** 条目章节 */
  @computed get eps() {
    if (this.subject._loaded) {
      const { filterEps = 0 } = this.params
      if (filterEps) {
        return (this.subject.eps || []).filter((item, index) => index > filterEps)
      }
      return this.subject.eps || []
    }

    return []
  }

  @computed get url() {
    return `${HOST}/subject/${this.subjectId}/ep`
  }
}
