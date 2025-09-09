/*
 * @Author: czy0729
 * @Date: 2024-12-03 15:38:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-09 20:56:53
 */
import { usersStore } from '@stores'
import { Keys } from '../types'
import Computed from './computed'

export default class Fetch extends Computed {
  fetchList = (key: Keys, refresh: boolean = false) => {
    if (key === 'recents') return usersStore.fetchRecents(refresh)
    if (key === 'persons') return usersStore.fetchPersons(this.userId, refresh)
    return usersStore.fetchCharacters(this.userId, refresh)
  }
}
