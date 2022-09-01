/*
 * @Author: czy0729
 * @Date: 2020-05-21 16:37:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 10:13:41
 */
import { computed } from 'mobx'
import { monoStore } from '@stores'
import store from '@utils/store'
import { HTML_SUBJECT_PERSONS } from '@constants'
import { Params } from './types'

export default class ScreenPersons extends store {
  params: Params

  init = () => {
    return this.fetchPersons()
  }

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId = '' } = this.params
    return subjectId
  }

  /** 更多制作人员 */
  @computed get persons() {
    return monoStore.persons(this.subjectId)
  }

  @computed get url() {
    return HTML_SUBJECT_PERSONS(this.subjectId)
  }

  // -------------------- fetch --------------------
  /** 更多制作人员 */
  fetchPersons = () => {
    return monoStore.fetchPersons({
      subjectId: this.subjectId
    })
  }
}
