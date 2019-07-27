/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:20:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-27 16:41:52
 */
import { observable, computed } from 'mobx'
import { usersStore } from '@stores'
import { sleep, getTimestamp } from '@utils'
import store from '@utils/store'

const namespace = 'ScreenFriends'

export default class ScreenFriends extends store {
  state = observable({
    sort: '',
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      _loaded: true
    })

    const res = this.fetchUsers()
    await res

    const { _loaded } = this.friends
    if (!_loaded) {
      this.initFetch()
    }

    return res
  }

  // -------------------- fetch --------------------
  initFetch = async () => {
    const res = this.fetchFriends()
    await res
    this.fetchUsersBatch()

    return res
  }

  fetchFriends = () => {
    const { userId } = this.params
    return usersStore.fetchFriends({ userId })
  }

  fetchUsers = () => {
    const { userId } = this.params
    return usersStore.fetchUsers({ userId })
  }

  fetchUsersBatch = async () => {
    let res
    for (const item of this.friends.list) {
      const { userId } = item
      res = usersStore.fetchUsers({ userId })
      await res
      await sleep(200)
    }
    return res
  }

  // -------------------- get --------------------
  @computed get friends() {
    const { userId } = this.params
    const friends = usersStore.friends(userId)
    const { sort } = this.state

    let list
    if (sort === 'percent') {
      list = friends.list.sort((a, b) => {
        const { percent: percentA } = this.users(a.userId)
        const { percent: percentB } = this.users(b.userId)
        return percentB - percentA
      })
    } else if (sort === 'recent') {
      list = friends.list.sort((a, b) => {
        const { recent: recentA } = this.users(a.userId)
        const { recent: recentB } = this.users(b.userId)
        return sortByRecent(recentA, recentB)
      })
    } else {
      list = friends.list
    }

    return {
      ...friends,
      list
    }
  }

  users(userId) {
    return computed(() => usersStore.users(userId)).get()
  }

  // -------------------- page --------------------
  sort = title => {
    let sort = ''
    if (title === '同步率') {
      sort = 'percent'
    }
    if (title === '最近操作') {
      sort = 'recent'
    }
    this.setState({
      sort
    })
    this.setStorage(undefined, undefined, namespace)
  }
}

function sortByRecent(recentA, recentB) {
  if (recentA.includes('-') && recentB.includes('-')) {
    return getTimestamp(recentB) - getTimestamp(recentA)
  }
  if (recentA.includes('-') && !recentB.includes('-')) {
    return true
  }
  if (!recentA.includes('-') && recentB.includes('-')) {
    return false
  }
  return getRecentTimestamp(recentA) - getRecentTimestamp(recentB)
}

function getRecentTimestamp(recent) {
  let timestamp = 0
  const d = recent.match(/\d+d/g)
  if (d) {
    timestamp += parseInt(d[0]) * 24 * 60 * 60
  }

  const h = recent.match(/\d+h/g)
  if (h) {
    timestamp += parseInt(h[0]) * 60 * 60
  }

  const m = recent.match(/\d+m/g)
  if (m) {
    timestamp += parseInt(m[0]) * 60
  }

  const s = recent.match(/\d+s/g)
  if (s) {
    timestamp += parseInt(m[0])
  }

  return timestamp
}
