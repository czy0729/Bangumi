/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:20:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-07 08:24:54
 */
import { observable, computed } from 'mobx'
import { usersStore, userStore } from '@stores'
import { desc, info } from '@utils'
import store from '@utils/store'
import { t, queue } from '@utils/fetch'
import { getPinYinFirstCharacter } from '@utils/thirdParty/pinyin'
import { HTML_FRIENDS } from '@constants'
import { UserId } from '@types'
import { sortByRecent } from './utils'
import { NAMESPACE, STATE, EXCLUDE_STATE } from './ds'
import { Params } from './types'

const PIN_YIN_FIRST_CHARACTER = {}

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
    const { userId } = this.params
    return usersStore.fetchFriends({
      userId
    })
  }

  /** 用户信息 (他人视角) */
  fetchUsers = () => {
    const { userId } = this.params
    return usersStore.fetchUsers({
      userId
    })
  }

  /** 批量获取所有好友信息 */
  fetchUsersBatch = () => {
    const { list } = this.friends
    info('刷新中...')

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
  /** 用户信息 */
  users(userId: UserId) {
    return computed(() => usersStore.users(userId)).get()
  }

  /** 好友列表 */
  @computed get friends() {
    const { userId } = this.params
    const friends = usersStore.friends(userId)
    const { filter, sort } = this.state
    const _filter = filter.toUpperCase()

    let list = friends.list
    if (_filter.length) {
      list = list.filter(item => {
        const { userName } = item
        if (userName.includes(_filter)) return true

        // 支持每个字符首拼音筛选
        if (/^[a-zA-Z]+$/.test(_filter) && userName) {
          if (!PIN_YIN_FIRST_CHARACTER[userName]) {
            PIN_YIN_FIRST_CHARACTER[userName] = getPinYinFirstCharacter(
              userName,
              userName.length
            ).replace(/ /g, '')
          }

          if (PIN_YIN_FIRST_CHARACTER[userName].includes(_filter)) return true
        }

        return false
      })
    }

    if (sort === 'percent') {
      list = list.sort((a, b) => desc(a, b, item => this.users(item.userId)?.percent))
    }

    if (sort === 'recent') {
      list = list.sort((a, b) =>
        sortByRecent(this.users(a.userId).recent, this.users(b.userId).recent)
      )
    }

    return {
      ...friends,
      list
    }
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
