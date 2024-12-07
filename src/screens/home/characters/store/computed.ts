/*
 * @Author: czy0729
 * @Date: 2024-08-24 11:21:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-04 20:49:19
 */
import { computed } from 'mobx'
import { monoStore } from '@stores'
import { Characters } from '@stores/mono/types'
import { HTML_SUBJECT_CHARACTERS, LIST_EMPTY } from '@constants'
import State from './state'

export default class Computed extends State {
  @computed get subjectId() {
    return this.params.subjectId
  }

  /** 更多角色 */
  @computed get characters(): Characters {
    const characters = monoStore.characters(this.subjectId)
    if (!characters._loaded) {
      if (!this.ota) return LIST_EMPTY

      return {
        ...this.ota,
        pagination: {
          page: 1,
          pageTotal: 10
        }
      }
    }

    return characters
  }

  @computed get url() {
    return HTML_SUBJECT_CHARACTERS(this.subjectId)
  }

  /** 云快照 */
  @computed get ota() {
    return this.state.ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey() {
    return `characters_${this.subjectId}`
  }

  @computed get hm() {
    return [this.url, 'Characters']
  }
}
