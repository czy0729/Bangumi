/*
 * @Author: czy0729
 * @Date: 2020-03-22 18:47:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-15 19:54:20
 */
import { observable, computed } from 'mobx'
import { usersStore, discoveryStore } from '@stores'
import store from '@utils/store'
import { queue } from '@utils/fetch'

export const tabs = [
  {
    title: '创建的',
    key: 'create'
  }
]
const namespace = 'ScreenStaff'

export default class ScreenStaff extends store {
  state = observable({
    page: 0,
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })

    const { page } = this.state
    const { key } = tabs[page]
    const { _loaded } = this.catalogs(key)
    if (!_loaded) {
      return this.fetchCatalogs(key, true)
    }
    return true
  }

  // -------------------- fetch --------------------
  fetchCatalogs = async (key, refresh) => {
    const res = usersStore.fetchCatalogs(
      {
        userId: this.userId,
        isCollect: key === 'collect'
      },
      refresh
    )

    const { list } = await res
    queue(list.map(item => () => this.fetchCatalogDetail(item.id)))

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

  // -------------------- get --------------------
  @computed get userId() {
    return 'lilyurey'
  }

  catalogs(key) {
    return usersStore.catalogs(this.userId, key === 'collect')
  }

  catalogDetail(id) {
    return computed(() => discoveryStore.catalogDetail(id)).get()
  }
}
