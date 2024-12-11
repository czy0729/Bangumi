/*
 * @Author: czy0729
 * @Date: 2024-09-13 04:54:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 05:02:24
 */
import { computed } from 'mobx'
import { _, usersStore, userStore } from '@stores'
import { Friend } from '@stores/users/types'
import { desc, getPinYinFilterValue } from '@utils'
import CacheManager from '@utils/cache-manager'
import { HTML_FRIENDS } from '@constants'
import { UserId } from '@types'
import { sortByRecent } from '../utils'
import State from './state'
import { NAMESPACE } from './ds'

export default class Computed extends State {
  /** 查询的用户 ID */
  @computed get userId() {
    return this.params.userId
  }

  /** 用户信息 */
  users(userId: UserId) {
    return computed(() => usersStore.users(userId)).get()
  }

  /** 好友列表 */
  @computed get friends() {
    return usersStore.friends(this.userId)
  }

  /** 筛选列表 */
  @computed get list(): Friend[] {
    const key = `${NAMESPACE}|list|${this.userId}`
    if (this.state.fetching) {
      const data = CacheManager.get(key)
      if (data) return CacheManager.get(key)
    }

    const filter = this.state.filter.toUpperCase()
    let { list } = this.friends
    if (filter.length) {
      list = list.filter(item => {
        const { userName } = item
        if (userName.includes(filter)) return true

        return getPinYinFilterValue(userName, filter)
      })
    }

    const { sort } = this.state
    if (sort === 'percent') {
      list = list.slice().sort((a, b) => desc(a, b, item => this.users(item.userId)?.percent))
    }

    if (sort === 'recent') {
      list = list
        .slice()
        .sort((a, b) => sortByRecent(this.users(a.userId).recent, this.users(b.userId).recent))
    }

    return CacheManager.set(key, list)
  }

  /** 一行多少个 */
  @computed get numColumns() {
    return _.portrait(5, 8)
  }

  /** 网址 */
  @computed get url() {
    return HTML_FRIENDS(this.params?.userId || userStore.myId)
  }

  @computed get hm() {
    return [this.url, 'Friends'] as const
  }
}
