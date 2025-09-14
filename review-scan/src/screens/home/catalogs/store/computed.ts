/*
 * @Author: czy0729
 * @Date: 2024-11-09 06:32:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-09 10:12:31
 */
import { computed } from 'mobx'
import { discoveryStore, subjectStore } from '@stores'
import { HTML_SUBJECT_CATALOGS, LIST_EMPTY } from '@constants'
import { Id } from '@types'
import { SnapshotId } from '../types'
import State from './state'

export default class Computed extends State {
  @computed get subjectId() {
    return this.params.subjectId
  }

  @computed get url() {
    return HTML_SUBJECT_CATALOGS(this.subjectId)
  }

  @computed get subjectCatalogs() {
    return subjectStore.subjectCatalogs(this.subjectId)
  }

  /** 包含条目的目录 */
  @computed get list() {
    if (!this.subjectCatalogs._loaded) {
      return this.ota
        ? {
            ...this.ota,
            pagination: {
              page: 1,
              pageTotal: 10
            }
          }
        : LIST_EMPTY
    }

    return this.subjectCatalogs
  }

  /** 目录详情 */
  catalogDetail(id: Id) {
    return computed(() => discoveryStore.catalogDetail(id)).get()
  }

  /** 云快照 */
  @computed get ota() {
    return this.state.ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey(): SnapshotId {
    return `subject-catalogs_${this.subjectId}`
  }

  @computed get hm() {
    return [this.url, 'SubjectCatalogs']
  }
}
