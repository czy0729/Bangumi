/*
 * @Author: czy0729
 * @Date: 2024-09-13 05:34:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 05:36:09
 */
import { computed } from 'mobx'
import { discoveryStore, usersStore, userStore } from '@stores'
import { HTML_USERS_CATALOGS } from '@constants'
import { TABS } from '../ds'
import State from './state'

import type { Id } from '@types'
import type { TabsKey } from '../types'

export default class Computed extends State {
  @computed get userId() {
    return this.params.userId || userStore.myId
  }

  @computed get url() {
    return HTML_USERS_CATALOGS(this.userId)
  }

  @computed get key() {
    return TABS[this.state.page]?.key
  }

  catalogs(key: TabsKey) {
    return usersStore.catalogs(this.userId, key === 'collect')
  }

  catalogDetail(id: Id) {
    return computed(() => discoveryStore.catalogDetail(id)).get()
  }

  @computed get hm() {
    return [this.url, 'Catelogs'] as const
  }
}
