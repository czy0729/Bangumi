/*
 * @Author: czy0729
 * @Date: 2020-05-21 16:37:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-21 16:41:48
 *
 * @Params: subjectId {Int}
 * @Params: name      {String}
 */
import { computed } from 'mobx'
import { monoStore } from '@stores'
import store from '@utils/store'
import { HTML_SUBJECT_CHARACTERS } from '@constants/html'

export default class ScreenCharacters extends store {
  init = () => this.fetchCharacters()

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId = '' } = this.params
    return subjectId
  }

  @computed get characters() {
    return monoStore.characters(this.subjectId)
  }

  @computed get url() {
    return HTML_SUBJECT_CHARACTERS(this.subjectId)
  }

  // -------------------- fetch --------------------
  fetchCharacters = () =>
    monoStore.fetchCharacters({
      subjectId: this.subjectId
    })
}
