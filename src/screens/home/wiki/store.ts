/*
 * @Author: czy0729
 * @Date: 2021-07-12 09:55:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 12:08:25
 */
import { computed } from 'mobx'
import { subjectStore } from '@stores'
import store from '@utils/store'
import { HOST } from '@constants'
import { Params } from './types'

export default class ScreenSubjectWiki extends store {
  params: Params

  init = () => {
    return subjectStore.fetchWiki({
      subjectId: this.subjectId
    })
  }

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId } = this.params
    return subjectId
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
}
