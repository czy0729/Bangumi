/*
 * @Author: czy0729
 * @Date: 2024-09-13 05:00:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 05:01:46
 */
import { usersStore } from '@stores'
import { getTimestamp } from '@utils'
import { queue } from '@utils/fetch'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 好友列表 */
  fetchFriends = () => {
    return usersStore.fetchFriends({
      userId: this.userId
    })
  }

  /** @deprecated 批量获取所有好友信息 */
  fetchUsersBatch = async () => {
    if (this.state.fetching) return false

    this.setState({
      fetching: true
    })

    const fetchs = []
    this.list.forEach((item, index) => {
      const { _loaded } = this.users(item.userId)
      if (!_loaded || getTimestamp() - Number(_loaded) >= 60 * (15 + index)) {
        fetchs.push(() =>
          usersStore.fetchUsers({
            userId: item.userId
          })
        )
      }
    })

    await queue(fetchs)
    this.setState({
      fetching: false
    })

    return true
  }
}
