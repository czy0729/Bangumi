/*
 * 用户控件
 * params { _name, _id, _image }
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-24 10:16:09
 */
import { observable, computed } from 'mobx'
import { userStore, usersStore, timelineStore } from '@stores'
import store from '@utils/store'
import { fetchHTML } from '@utils/fetch'
import { info } from '@utils/ui'
import { HOST } from '@constants'
import _ from '@styles'

export const height = _.window.width * 0.64

// @todo 偏差了6pt, 有空再纠正
export const headerHeight = _.headerHeight + 6
export const tabs = [
  {
    title: '番剧'
  },
  {
    title: '时间胶囊'
  },
  {
    title: '关于TA'
  }
]
const namespace = 'ScreenZone'

export default class ScreenZone extends store {
  state = observable({
    expand: {
      在看: true,
      看过: false,
      想看: false,
      搁置: false,
      抛弃: false
    },
    page: 0, // <Tabs>当前页数
    _page: 0, // header上的假<Tabs>当前页数,
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      page: 0,
      _page: 0,
      _loaded: true
    })

    const res = this.fetchUsersInfo()
    await res

    this.fetchUserCollections()
    this.fetchUsers()
    return res
  }

  // -------------------- get --------------------
  @computed get usersInfo() {
    const { userId } = this.params
    return userStore.usersInfo(userId)
  }

  @computed get userCollections() {
    const { userId } = this.params
    return userStore.userCollections(undefined, userId)
  }

  @computed get usersTimeline() {
    const { userId } = this.params
    return timelineStore.usersTimeline(userId)
  }

  @computed get users() {
    const { userId } = this.params
    return usersStore.users(userId)
  }

  // -------------------- fetch --------------------
  fetchUsersInfo = () => {
    const { userId } = this.params
    return userStore.fetchUsersInfo(userId)
  }

  fetchUserCollections = () => {
    const { userId } = this.params
    return userStore.fetchUserCollections(undefined, userId)
  }

  fetchUsersTimeline = () => {
    const { userId } = this.params
    return timelineStore.fetchUsersTimeline({ userId })
  }

  fetchUsers = () => {
    const { userId } = this.params
    return usersStore.fetchUsers({ userId })
  }

  // -------------------- page --------------------
  onTabClick = (item, page) => {
    if (page === this.state.page) {
      return
    }

    this.setState({
      page
    })
    // @issue onTabClick与onChange在用受控模式的时候有冲突, 暂时这样解决
    setTimeout(() => {
      this.setState({
        _page: page
      })
    }, 400)
    this.tabChangeCallback(page)
  }

  onChange = (item, page) => {
    if (page === this.state.page) {
      return
    }

    this.setState({
      page,
      _page: page
    })
    this.tabChangeCallback(page)
  }

  tabChangeCallback = page => {
    // 延迟请求
    if (tabs[page].title === '时间胶囊') {
      this.fetchUsersTimeline()
    }
  }

  toggleSection = title => {
    const { expand } = this.state
    this.setState({
      expand: {
        ...expand,
        [title]: !expand[title]
      }
    })
    this.setStorage(undefined, undefined, namespace)
  }

  // -------------------- action --------------------
  /**
   * 添加好友
   */
  doConnectFriend = async () => {
    const { connectUrl } = this.users
    if (connectUrl) {
      await fetchHTML({
        url: `${HOST}${connectUrl}`
      })
      info('已添加好友')
      this.fetchUsers()
    }
  }

  /**
   * 解除好友
   */
  doDisconnectFriend = async () => {
    const { disconnectUrl } = this.users
    if (disconnectUrl) {
      await fetchHTML({
        url: `${HOST}${disconnectUrl}`
      })
      info('已解除好友')
      this.fetchUsers()
    }
  }
}
