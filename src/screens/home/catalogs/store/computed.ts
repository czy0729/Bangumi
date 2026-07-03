/*
 * @Author: czy0729
 * @Date: 2024-11-09 06:32:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-03 20:37:56
 */
import { computed } from 'mobx'
import { discoveryStore, subjectStore } from '@stores'
import { computedFn } from '@utils/computed-fn'
import { HTML_SUBJECT_CATALOGS, LIST_EMPTY } from '@constants'
import State from './state'

import type { SubjectCatalogs } from '@stores/subject/types'
import type { Id } from '@types'
import type { SnapshotId } from '../types'

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
      return (
        this.ota
          ? {
              ...this.ota,
              pagination: {
                page: 1,
                pageTotal: 10
              }
            }
          : LIST_EMPTY
      ) as SubjectCatalogs
    }

    return this.subjectCatalogs
  }

  /** 目录详情 */
  catalogDetail = computedFn((id: Id) => {
    return discoveryStore.catalogDetail(id)
  })

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
