/*
 * @Author: czy0729
 * @Date: 2024-09-13 05:36:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 05:37:34
 */
import { discoveryStore, usersStore } from '@stores'
import { queue } from '@utils/fetch'
import Computed from './computed'

import type { Id } from '@types'
import type { TabsKey } from '../types'

export default class Fetch extends Computed {
  /** 用户目录 */
  fetchCatalogs = async (key: TabsKey, refresh: boolean = false) => {
    const data = await usersStore.fetchCatalogs(
      {
        userId: this.userId,
        isCollect: key === 'collect'
      },
      refresh
    )
    queue(data.list.map(item => () => this.fetchCatalogDetail(item.id)))

    return data
  }

  /** 目录详情 */
  fetchCatalogDetail = async (id: Id) => {
    if (discoveryStore.catalogDetail(id)._loaded) return true

    return discoveryStore.fetchCatalogDetail(id)
  }
}
