/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:20:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-28 03:55:13
 */
import { observable, computed } from 'mobx'
import { usersStore, userStore } from '@stores'
import { desc, getPinYinFilterValue, getTimestamp } from '@utils'
import store from '@utils/store'
import { t, queue } from '@utils/fetch'
import CacheManager from '@utils/cache-manager'
import { HTML_FRIENDS } from '@constants'
import { UserId } from '@types'
import { sortByRecent } from './utils'
import { NAMESPACE, STATE, EXCLUDE_STATE } from './ds'
import { Params } from './types'

export default class ScreenFriends extends store {
  params: Params

  state = observable(STATE)

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    await this.fetchUsers()

    this.onRefresh()
    return true
  }

  // -------------------- fetch --------------------
  /** 下拉刷新 */
  onRefresh = async () => {
    await this.fetchFriends()
    this.fetchUsersBatch()
    return true
  }

  /** 好友列表 */
  fetchFriends = () => {
    return usersStore.fetchFriends({
      userId: this.userId
    })
  }

  /** 用户信息 (他人视角) */
  fetchUsers = () => {
    return usersStore.fetchUsers({
      userId: this.userId
    })
  }

  /** 批量获取所有好友信息 */
  fetchUsersBatch = async () => {
    const { fetching } = this.state
    if (fetching) return false

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

  // -------------------- get --------------------
  @computed get userId() {
    const { userId } = this.params
    return userId
  }

  /** 用户信息 */
  users(userId: UserId) {
    return computed(() => usersStore.users(userId)).get()
  }

  /** 好友列表 */
  @computed get friends() {
    return usersStore.friends(this.userId)
  }

  @computed get list() {
    const key = `${NAMESPACE}|list|${this.userId}`
    if (this.state.fetching) {
      const data = CacheManager.get(key)
      if (data) return CacheManager.get(key)
    }

    let { list } = this.friends
    const { filter, sort } = this.state
    const _filter = filter.toUpperCase()
    if (_filter.length) {
      list = list.filter(item => {
        const { userName } = item
        if (userName.includes(_filter)) return true

        return getPinYinFilterValue(userName, _filter)
      })
    }

    if (sort === 'percent') {
      list = list
        .slice()
        .sort((a, b) => desc(a, b, item => this.users(item.userId)?.percent))
    }

    if (sort === 'recent') {
      list = list
        .slice()
        .sort((a, b) =>
          sortByRecent(this.users(a.userId).recent, this.users(b.userId).recent)
        )
    }

    return CacheManager.set(key, list)
  }

  /** 网址 */
  @computed get url() {
    return HTML_FRIENDS(this.params?.userId || userStore.myId)
  }

  // -------------------- page --------------------
  /** 排序 */
  onSort = (title: string) => {
    t('好友.排序', {
      title
    })

    let sort = ''
    if (title === '同步率') sort = 'percent'
    if (title === '最近') sort = 'recent'

    this.setState({
      sort
    })
    this.setStorage(NAMESPACE)
  }

  /** 过滤 */
  onFilterChange = (filter: string) => {
    this.setState({
      filter: filter.trim()
    })
  }
}
