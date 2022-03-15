/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:20:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 01:27:23
 */
import { observable, computed } from 'mobx'
import { usersStore, userStore } from '@stores'
import { getTimestamp, desc } from '@utils'
import store from '@utils/store'
import { t, queue } from '@utils/fetch'
import { info } from '@utils/ui'
import { getPinYinFirstCharacter } from '@utils/thirdParty/pinyin'
import { HTML_FRIENDS } from '@constants/html'

const namespace = 'ScreenFriends'
const excludeState = {
  filter: ''
}
const pinYinFirstCharacter = {}

export default class ScreenFriends extends store {
  state = observable({
    sort: '',
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(undefined, namespace)) || {}
    this.setState({
      ...state,
      ...excludeState,
      _loaded: true
    })

    const res = this.fetchUsers()
    await res

    this.refresh()
    return res
  }

  // -------------------- fetch --------------------
  refresh = async () => {
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

  fetchUsersBatch = () => {
    const { list } = this.friends
    info('刷新好友信息中...')
    return queue(
      list.map(
        item => () =>
          usersStore.fetchUsers({
            userId: item.userId
          })
      )
    )
  }

  // -------------------- get --------------------
  @computed get friends() {
    const { userId } = this.params
    const friends = usersStore.friends(userId)
    const { filter, sort } = this.state
    const _filter = filter.toUpperCase()

    let list = friends.list
    if (_filter.length) {
      list = list.filter(item => {
        const { userName } = item
        if (userName.includes(_filter)) {
          return true
        }

        // 支持每个字符首拼音筛选
        if (/^[a-zA-Z]+$/.test(_filter) && userName) {
          if (!pinYinFirstCharacter[userName]) {
            pinYinFirstCharacter[userName] = getPinYinFirstCharacter(
              userName,
              userName.length
            ).replace(/ /g, '')
          }

          if (pinYinFirstCharacter[userName].includes(_filter)) {
            return true
          }
        }

        return false
      })
    }

    if (sort === 'percent') {
      list = list.sort((a, b) => desc(a, b, item => this.users(item.userId)?.percent))
    } else if (sort === 'recent') {
      list = list.sort((a, b) => {
        const { recent: recentA } = this.users(a.userId)
        const { recent: recentB } = this.users(b.userId)
        return sortByRecent(recentA, recentB)
      })
    }

    return {
      ...friends,
      list
    }
  }

  users(userId) {
    return computed(() => usersStore.users(userId)).get()
  }

  @computed get url() {
    return HTML_FRIENDS(this.params?.userId || userStore.myId)
  }

  // -------------------- page --------------------
  sort = title => {
    t('好友.排序', {
      title
    })

    let sort = ''
    if (title === '同步率') {
      sort = 'percent'
    }
    if (title === '最近') {
      sort = 'recent'
    }
    this.setState({
      sort
    })
    this.setStorage(undefined, undefined, namespace)
  }

  onFilterChange = filter => {
    this.setState({
      filter: filter.trim()
    })
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
  try {
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
      timestamp += parseInt(s[0])
    }

    return timestamp
  } catch (error) {
    return getTimestamp()
  }
}
