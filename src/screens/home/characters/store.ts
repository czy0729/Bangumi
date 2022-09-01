/*
 * @Author: czy0729
 * @Date: 2020-05-21 16:37:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-21 16:41:48
 */
import { computed } from 'mobx'
import { monoStore } from '@stores'
import store from '@utils/store'
import { HTML_SUBJECT_CHARACTERS } from '@constants'
import { Params } from './types'

export default class ScreenCharacters extends store {
  params: Params

  init = () => {
    return this.fetchCharacters()
  }

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId = '' } = this.params
    return subjectId
  }

  /** 更多角色 */
  @computed get characters() {
    return monoStore.characters(this.subjectId)
  }

  @computed get url() {
    return HTML_SUBJECT_CHARACTERS(this.subjectId)
  }

  // -------------------- fetch --------------------
  /** 更多角色 */
  fetchCharacters = () => {
    return monoStore.fetchCharacters({
      subjectId: this.subjectId
    })
  }
}
