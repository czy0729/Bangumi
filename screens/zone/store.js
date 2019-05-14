/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-14 19:34:37
 */
import { observable, computed } from 'mobx'
import { userStore, timelineStore } from '@stores'
import store from '@utils/store'
import { window } from '@styles'

export const height = window.width * 0.64
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

export default class Store extends store {
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
    const state = await this.getStorage()
    this.setState({
      ...state,
      page: 0,
      _page: 0,
      _loaded: true
    })

    const res = this.fetchUsersInfo()
    await res

    this.fetchUserCollections()
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

  fetchUsersDesc = Function.prototype

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
    // 后2个tab是延迟请求的
    if (tabs[page].title === '时间胶囊') {
      this.fetchUsersTimeline()
    } else if (tabs[page].title === '关于TA') {
      this.fetchUsersDesc()
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
    this.setStorage()
  }

  // -------------------- action --------------------
}
