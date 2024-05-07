/*
 * @Author: czy0729
 * @Date: 2020-03-22 18:47:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 21:44:07
 */
import { computed, observable } from 'mobx'
import { discoveryStore, usersStore, userStore } from '@stores'
import { queue, t } from '@utils/fetch'
import store from '@utils/store'
import { HTML_USERS_CATALOGS } from '@constants'
import { Id } from '@types'
import { NAMESPACE, STATE, TABS } from './ds'
import { Params, TabsLabel } from './types'

export default class ScreenCatelogs extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

  init = async () => {
    const state = await this.getStorage(NAMESPACE)
    this.setState({
      ...state,
      _loaded: true
    })

    const { page } = this.state
    const { key } = TABS[page]
    return this.fetchCatalogs(key, true)
  }

  // -------------------- fetch --------------------
  /** 用户目录 */
  fetchCatalogs = async (key: TabsLabel, refresh: boolean = false) => {
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
    const { userId = userStore.myId } = this.params
    return userId
  }

  @computed get url() {
    return HTML_USERS_CATALOGS(this.userId)
  }

  catalogs(key: TabsLabel) {
    return usersStore.catalogs(this.userId, key === 'collect')
  }

  catalogDetail(id: Id) {
    return computed(() => discoveryStore.catalogDetail(id)).get()
  }

  // -------------------- page --------------------
  /** 标签页切换 */
  onChange = (page: number) => {
    if (page === this.state.page) return

    t('用户目录.标签页切换')
    this.setState({
      page
    })
    this.setStorage(NAMESPACE)
    this.tabChangeCallback(page)
  }

  /** 标签页切换回调 */
  tabChangeCallback = (page: number) => {
    const { key } = TABS[page]
    const { _loaded } = this.catalogs(key)
    if (!_loaded) this.fetchCatalogs(key, true)
  }
}
