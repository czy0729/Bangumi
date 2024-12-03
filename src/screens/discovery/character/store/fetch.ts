/*
 * @Author: czy0729
 * @Date: 2024-12-03 15:38:50
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-12-03 15:38:50
 */
import { usersStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  fetchList = (key: string, refresh: boolean = false) => {
    if (key === 'recents') {
      return usersStore.fetchRecents(refresh)
    }

    if (key === 'persons') {
      return usersStore.fetchPersons(
        {
          userId: this.userId
        },
        refresh
      )
    }

    return usersStore.fetchCharacters(
      {
        userId: this.userId
      },
      refresh
    )
  }
}
