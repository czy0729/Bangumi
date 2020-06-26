/*
 * 用户控件
 * @Params: { _id, _name, _image }
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 05:05:53
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
import { x18 } from '@utils/app'
import { fetchHTML, t } from '@utils/fetch'
import { HTMLDecode } from '@utils/html'
import { info } from '@utils/ui'
import { HOST, IOS } from '@constants'

export const H_BG = Math.min(parseInt(_.window.width * 0.64), 288) // 整个背景高度
export const H_HEADER = IOS ? 88 : 80 // fixed后带背景的头部高度
export const H_TABBAR = 48 // TabBar高度

// @todo 偏差了6pt, 有空再纠正
export const headerHeight = _.headerHeight
export const tabs = [
  {
    title: '番剧',
    key: 'bangumi'
  },
  {
    title: '时间胶囊',
    key: 'timeline'
  },
  {
    title: '关于TA',
    key: 'about'
  }
]
export const tabsWithTinygrail = [
  ...tabs,
  {
    title: '小圣杯',
    key: 'tinygrail'
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
    page: 0,
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      page: this.isFromTinygrail ? 3 : 0,
      _loaded: true
    })

    if (this.isFromTinygrail) {
      this.fetchCharaAssets()
      this.fetchTempleTotal()
      this.fetchCharaTotal()
    } else {
      this.fetchUserCollections()
    }

    this.fetchUsers()
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
    const userCollections = userStore.userCollections(undefined, this.userId)
    if (userStore.isLimit) {
      return {
        ...userCollections,
        list: userCollections.list.filter(item => !x18(item.id))
      }
    }
    return userCollections
  }

  @computed get usersTimeline() {
    return timelineStore.usersTimeline(this.userId)
  }

  @computed get users() {
    return usersStore.users(this.userId)
  }

  @computed get bg() {
    const { sign = '' } = this.users
    const bgs = sign.match(/\[bg\](.+?)\[\/bg\]/)
    return bgs ? String(bgs[1]).trim() : ''
  }

  @computed get avatar() {
    const { sign = '' } = this.users
    const avatars = sign.match(/\[avatar\](.+?)\[\/avatar\]/)
    return avatars ? String(avatars[1]).trim() : ''
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
  onChange = page => {
    t('空间.标签页切换', {
      userId: this.userId,
      page
    })

    this.setState({
      page
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
