/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:54:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-24 20:07:33
 */
import { collectionStore, usersStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  fetchUsers = () => {
    return usersStore.fetchUsers(this.userId)
  }

  fetchUserCollections = async (refresh: boolean = false) => {
    const { fetching, subjectType, type, order, tag, nsfw } = this.state
    if (fetching) return false

    this.setState({
      fetching: true
    })
    await collectionStore.fetchUserCollections(
      {
        subjectType,
        type,
        order,
        tag,
        userId: this.userId,
        auth: nsfw,
        forMilestone: true
      },
      refresh
    )
    this.setState({
      fetching: false
    })

    return true
  }
}
