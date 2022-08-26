/*
 * @Author: czy0729
 * @Date: 2020-03-22 18:47:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 14:00:59
 */
import { computed } from 'mobx'
import { usersStore, discoveryStore } from '@stores'
import store from '@utils/store'
import { queue } from '@utils/fetch'
import { Id } from '@types'

export default class ScreenStaff extends store {
  init = async () => {
    const { _loaded } = this.catalogs
    if (!_loaded) return this.fetchCatalogs(true)
    return true
  }

  // -------------------- fetch --------------------
  /** 用户目录 */
  fetchCatalogs = async (refresh: boolean = false) => {
    const res = usersStore.fetchCatalogs(
      {
        userId: this.userId,
        isCollect: false
      },
      refresh
    )

    const { list } = await res
    queue(list.map(item => () => this.fetchCatalogDetail(item.id)))

    return res
  }

  /** 目录详情 */
  fetchCatalogDetail = async (id: Id) => {
    const { _loaded } = discoveryStore.catalogDetail(id)
    if (_loaded) return true

    return discoveryStore.fetchCatalogDetail({
      id
    })
  }

  // -------------------- get --------------------
  @computed get userId() {
    return 'lilyurey'
  }

  /** 用户目录 */
  @computed get catalogs() {
    return usersStore.catalogs(this.userId, false)
  }

  /** 目录详情 */
  catalogDetail(id: Id) {
    return computed(() => discoveryStore.catalogDetail(id)).get()
  }
}
