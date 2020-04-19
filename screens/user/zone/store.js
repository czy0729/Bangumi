/*
 * 用户控件
 * @Params: { _id, _name, _image }
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-19 19:08:04
 */
import { observable, computed } from 'mobx'
import {
  _,
  userStore,
  usersStore,
  timelineStore,
  tinygrailStore,
  systemStore
} from '@stores'
import store from '@utils/store'
import { fetchHTML, t } from '@utils/fetch'
import { HTMLDecode } from '@utils/html'
import { info } from '@utils/ui'
import { HOST } from '@constants'

export const height = Math.min(_.window.width * 0.64, 288)

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
export const tabsWithTinygrail = [
  ...tabs,
  {
    title: '小圣杯'
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
      page: this.isFromTinygrail ? 3 : 0,
      _page: this.isFromTinygrail ? 3 : 0,
      _loaded: true
    })

    if (this.isFromTinygrail) {
      this.fetchCharaAssets()
      this.fetchTempleTotal()
      this.fetchCharaTotal()
    } else {
      this.fetchUserCollections()
      this.fetchUsers()
    }

    return this.fetchUsersInfo()
  }

  // -------------------- get --------------------
  @computed get tabs() {
    const { tinygrail } = systemStore.setting
    if (tinygrail) {
      return tabsWithTinygrail
    }
    return tabs
  }

  @computed get isFromTinygrail() {
    const { from } = this.params
    return from === 'tinygrail'
  }

  @computed get userId() {
    const { userId = '' } = this.params
    return userId
  }

  @computed get usersInfo() {
    return userStore.usersInfo(this.userId)
  }

  @computed get username() {
    const { username } = this.usersInfo
    return username
  }

  @computed get userCollections() {
    return userStore.userCollections(undefined, this.userId)
  }

  @computed get usersTimeline() {
    return timelineStore.usersTimeline(this.userId)
  }

  @computed get users() {
    return usersStore.users(this.userId)
  }

  @computed get userAssets() {
    return tinygrailStore.userAssets(this.username)
  }

  @computed get templeTotal() {
    return tinygrailStore.templeTotal(this.username)
  }

  @computed get charaTotal() {
    return tinygrailStore.charaTotal(this.username)
  }

  // -------------------- fetch --------------------
  fetchUsersInfo = () => userStore.fetchUsersInfo(this.userId)

  fetchUserCollections = () =>
    userStore.fetchUserCollections(undefined, this.userId)

  fetchUsersTimeline = () =>
    timelineStore.fetchUsersTimeline({
      userId: this.userId
    })

  fetchUsers = () =>
    usersStore.fetchUsers({
      userId: this.userId
    })

  fetchCharaAssets = () => tinygrailStore.fetchUserAssets(this.username)

  fetchTempleTotal = () => tinygrailStore.fetchTempleTotal(this.username)

  fetchCharaTotal = () => tinygrailStore.fetchCharaTotal(this.username)

  // -------------------- page --------------------
  onTabClick = (item, page) => {
    if (page === this.state.page) {
      return
    }

    t('空间.标签页点击', {
      userId: this.userId,
      page
    })

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

    t('空间.标签页切换', {
      userId: this.userId,
      page
    })

    this.setState({
      page,
      _page: page
    })
    this.tabChangeCallback(page)
  }

  tabChangeCallback = page => {
    const { title } = this.tabs[page]

    // 延迟请求
    if (title === '时间胶囊') {
      this.fetchUsersTimeline()
    }

    if (title === '番剧' && this.isFromTinygrail) {
      this.fetchUserCollections()
      this.fetchUsers()
    }

    if (title === '小圣杯' && !this.isFromTinygrail) {
      this.fetchCharaAssets()
      this.fetchTempleTotal()
      this.fetchCharaTotal()
    }
  }

  toggleSection = title => {
    const { expand } = this.state
    t('空间.展开分组', {
      userId: this.userId,
      title,
      expand: !expand[title]
    })

    this.setState({
      expand: {
        ...expand,
        [title]: !expand[title]
      }
    })
    this.setStorage(undefined, undefined, namespace)
  }

  toUser = navigation => {
    const { _name } = this.params
    const { avatar = {}, nickname, username } = this.usersInfo
    navigation.push('User', {
      userId: username,
      _name: HTMLDecode(nickname || _name),
      _image: avatar.large
    })
  }

  // -------------------- action --------------------
  /**
   * 添加好友
   */
  doConnectFriend = async () => {
    t('空间.添加好友', {
      userId: this.userId
    })

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
    t('空间.解除好友', {
      userId: this.userId
    })

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
