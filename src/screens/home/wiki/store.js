/*
 * @Author: czy0729
 * @Date: 2021-07-12 09:55:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 20:54:04
 */
import { computed } from 'mobx'
import { subjectStore } from '@stores'
import store from '@utils/store'
import { HOST } from '@constants'

export default class ScreenSubjectWiki extends store {
  init = () =>
    subjectStore.fetchWiki({
      subjectId: this.subjectId
    })

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId } = this.params
    return subjectId
  }

  @computed get subject() {
    return subjectStore.subject(this.subjectId)
  }

  @computed get wiki() {
    return subjectStore.wiki(this.subjectId)
  }

  @computed get url() {
    return `${HOST}/subject/${this.subjectId}/edit`
  }
}
