/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:20:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-12 03:16:57
 */
import { computed, observable } from 'mobx'
import { usersStore, userStore } from '@stores'
import { debounce, desc, getPinYinFilterValue, getTimestamp } from '@utils'
import CacheManager from '@utils/cache-manager'
import { queue, t } from '@utils/fetch'
import store from '@utils/store'
import { HTML_FRIENDS } from '@constants'
import { UserId } from '@types'
import { sortByRecent } from './utils'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'
import { Params, Sort } from './types'

export default class ScreenFriends extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchFriends()
  }

  // -------------------- fetch --------------------
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

  // -------------------- get --------------------
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
  @computed get list() {
    const key = `${NAMESPACE}|list|${this.userId}`
    if (this.state.fetching) {
      const data = CacheManager.get(key)
      if (data) return CacheManager.get(key)
    }

    const { filter } = this.state
    const _filter = filter.toUpperCase()
    let { list } = this.friends
    if (_filter.length) {
      list = list.filter(item => {
        const { userName } = item
        if (userName.includes(_filter)) return true

        return getPinYinFilterValue(userName, _filter)
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

    let sort: Sort = ''
    if (title === '同步率') sort = 'percent'
    if (title === '最近') sort = 'recent'

    this.setState({
      sort
    })
    this.setStorage(NAMESPACE)
  }

  /** 过滤 */
  onFilterChange = debounce((filter: string) => {
    this.setState({
      filter: filter.trim()
    })
  })
}
