/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:57:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 09:15:29
 */
import { computed } from 'mobx'
import { subjectStore, discoveryStore } from '@stores'
import store from '@utils/store'
import { queue } from '@utils/fetch'
import { HTML_SUBJECT_CATALOGS } from '@constants'
import { Id } from '@types'
import { Params } from './types'

export default class ScreenSubjectCatalogs extends store {
  params: Params

  init = () => {
    return this.fetchSubjectCatalogs(true)
  }

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId } = this.params
    return subjectId
  }

  @computed get url() {
    return HTML_SUBJECT_CATALOGS(this.subjectId)
  }

  /** 包含条目的目录 */
  @computed get list() {
    return subjectStore.subjectCatalogs(this.subjectId)
  }

  /** 目录详情 */
  catalogDetail(id: Id) {
    return computed(() => discoveryStore.catalogDetail(id)).get()
  }

  // -------------------- fetch --------------------
  /** 包含条目的目录 */
  fetchSubjectCatalogs = async (refresh: boolean = false) => {
    const data = await subjectStore.fetchSubjectCatalogs(
      {
        subjectId: this.subjectId
      },
      refresh
    )
    queue(data.list.map(item => () => this.fetchCatalogDetail(item.id)))

    return true
  }

  /** 目录详情 */
  fetchCatalogDetail = async (id: Id) => {
    const { _loaded } = discoveryStore.catalogDetail(id)
    if (_loaded) return true

    return discoveryStore.fetchCatalogDetail({
      id
    })
  }
}
