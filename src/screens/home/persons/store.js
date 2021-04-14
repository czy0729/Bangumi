/*
 * @Author: czy0729
 * @Date: 2020-05-21 16:37:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-21 20:02:22
 *
 * @Params: subjectId {Int}
 * @Params: name      {String}
 */
import { computed } from 'mobx'
import { monoStore } from '@stores'
import store from '@utils/store'
import { HTML_SUBJECT_PERSONS } from '@constants/html'

export default class ScreenPersons extends store {
  init = () => this.fetchPersons()

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId = '' } = this.params
    return subjectId
  }

  @computed get persons() {
    return monoStore.persons(this.subjectId)
  }

  @computed get url() {
    return HTML_SUBJECT_PERSONS(this.subjectId)
  }

  // -------------------- fetch --------------------
  fetchPersons = () =>
    monoStore.fetchPersons({
      subjectId: this.subjectId
    })
}
