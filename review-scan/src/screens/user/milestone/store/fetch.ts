/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:54:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 23:35:21
 */
import { collectionStore, usersStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  fetchUsers = () => {
    return usersStore.fetchUsers({
      userId: this.userId
    })
  }

  fetchUserCollections = (refresh: boolean = false) => {
    const { subjectType, type, order, tag, nsfw } = this.state
    return collectionStore.fetchUserCollections(
      {
        subjectType,
        type,
        order,
        tag,
        userId: this.userId,
        auth: nsfw
      },
      refresh
    )
  }
}
