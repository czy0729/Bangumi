/*
 * @Author: czy0729
 * @Date: 2020-03-22 18:47:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-22 20:55:31
 */
import { observable, computed } from 'mobx'
import { userStore, usersStore, discoveryStore } from '@stores'
import store from '@utils/store'
import { t, queue } from '@utils/fetch'

export const tabs = [
  {
    title: '创建的',
    key: 'create'
  },
  {
    title: '收藏的',
    key: 'collect'
  }
]
const namespace = 'ScreenCatelogs'

export default class ScreenCatelogs extends store {
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
    const { userId = userStore.myId } = this.params
    return userId
  }

  catalogs(key) {
    return usersStore.catalogs(this.userId, key === 'collect')
  }

  catalogDetail(id) {
    return computed(() => discoveryStore.catalogDetail(id)).get()
  }

  // -------------------- page --------------------
  onChange = (item, page) => {
    if (page === this.state.page) {
      return
    }

    t('用户目录.标签页切换')
    this.setState({
      page
    })
    this.setStorage(undefined, undefined, namespace)
    this.tabChangeCallback(page)
  }

  tabChangeCallback = page => {
    const { key } = tabs[page]
    const { _loaded } = this.catalogs(key)
    if (!_loaded) {
      this.fetchCatalogs(key, true)
    }
  }
}
