/*
 * @Author: czy0729
 * @Date: 2024-08-27 04:39:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-27 04:40:17
 */
import { computed } from 'mobx'
import { monoStore } from '@stores'
import { HTML_SUBJECT_PERSONS, LIST_EMPTY } from '@constants'
import State from './state'

export default class Computed extends State {
  @computed get subjectId() {
    return this.params.subjectId
  }

  /** 更多制作人员 */
  @computed get persons() {
    const persons = monoStore.persons(this.subjectId)
    if (!persons._loaded) {
      if (!this.ota) return LIST_EMPTY

      return {
        ...this.ota,
        pagination: {
          page: 1,
          pageTotal: 10
        }
      }
    }

    return persons
  }

  @computed get url() {
    return HTML_SUBJECT_PERSONS(this.subjectId)
  }

  /** 云快照 */
  @computed get ota() {
    return this.state.ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey() {
    return `persons_${this.subjectId}`
  }
}
