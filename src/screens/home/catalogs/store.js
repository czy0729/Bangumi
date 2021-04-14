/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:57:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-07 16:12:27
 */
import { computed } from 'mobx'
import { subjectStore, discoveryStore } from '@stores'
import { HTML_SUBJECT_CATALOGS } from '@constants/html'
import store from '@utils/store'
import { queue } from '@utils/fetch'

export default class ScreenSubjectCatalogs extends store {
  init = () => this.fetchSubjectCatalogs(true)

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId } = this.params
    return subjectId
  }

  @computed get url() {
    return HTML_SUBJECT_CATALOGS(this.subjectId)
  }

  @computed get list() {
    return subjectStore.subjectCatalogs(this.subjectId)
  }

  catalogDetail(id) {
    return computed(() => discoveryStore.catalogDetail(id)).get()
  }

  // -------------------- fetch --------------------
  fetchSubjectCatalogs = async refresh => {
    const res = subjectStore.fetchSubjectCatalogs(
      {
        subjectId: this.subjectId
      },
      refresh
    )
    const data = await res
    queue(data.list.map(item => () => this.fetchCatalogDetail(item.id)))

    return res
  }

  fetchCatalogDetail = async id => {
    const { _loaded } = discoveryStore.catalogDetail(id)
    if (_loaded) {
      return true
    }

    return discoveryStore.fetchCatalogDetail({
      id
    })
  }
}
