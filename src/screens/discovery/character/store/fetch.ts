/*
 * @Author: czy0729
 * @Date: 2024-12-03 15:38:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 人物数据获取
 */
import { collectionStore, usersStore } from '@stores'
import Computed from './computed'

import type { Recents } from '@stores/users/types'
import type { Keys } from '../types'

export default class Fetch extends Computed {
  /** 标签页对应的列表数据 */
  fetchList = async (key: Keys, refresh: boolean = false) => {
    if (key === 'persons') return usersStore.fetchPersons(this.userId, refresh)
    if (key === 'characters') return usersStore.fetchCharacters(this.userId, refresh)

    const data = await usersStore.fetchRecents(refresh)
    this.fetchCollectionStatusQueue(data.list)
    return data
  }

  /** 延迟获取条目的具体收藏状态 (条目的管理按钮显示需要) */
  fetchCollectionStatusQueue = (list: Recents['list']) => {
    setTimeout(() => {
      collectionStore.fetchCollectionStatusQueue(list.map(item => item.id))
    }, 160)
  }
}
