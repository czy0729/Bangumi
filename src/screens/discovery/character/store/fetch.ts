/*
 * @Author: czy0729
 * @Date: 2024-12-03 15:38:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 人物数据获取
 */
import { usersStore } from '@stores'
import Computed from './computed'

import type { Keys } from '../types'

export default class Fetch extends Computed {
  /** 标签页对应的列表数据 */
  fetchList = (key: Keys, refresh: boolean = false) => {
    if (key === 'recents') return usersStore.fetchRecents(refresh)
    if (key === 'persons') return usersStore.fetchPersons(this.userId, refresh)
    return usersStore.fetchCharacters(this.userId, refresh)
  }
}
