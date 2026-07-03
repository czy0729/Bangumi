/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:54:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-04 22:35:00
 */
import { collectionStore, usersStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 上次请求的 reverse 状态，用于判断是否需要清空列表 */
  private _lastReverse?: boolean

  fetchUsers = () => {
    return usersStore.fetchUsers(this.userId)
  }

  fetchUserCollections = async (refresh: boolean = false) => {
    const { fetching, subjectType, type, order, tag, nsfw, reverse } = this.state
    if (fetching) return false

    this.setState({
      fetching: true
    })

    // reverse 变化时清空列表，避免正序/倒序数据混在一起
    if (refresh && this._lastReverse !== undefined && this._lastReverse !== reverse) {
      collectionStore.clearUserCollections(this.userId, subjectType, type, true)
    }
    this._lastReverse = reverse

    await collectionStore.fetchUserCollections(
      {
        subjectType,
        type,
        order,
        tag,
        userId: this.userId,
        auth: nsfw,
        forMilestone: true,
        reverse
      },
      refresh
    )
    this.setState({
      fetching: false
    })

    return true
  }
}
