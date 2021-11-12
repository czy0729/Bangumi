/*
 * 用户控件
 * @Params: { _id, _name, _image }
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-12 09:03:58
 */
import { observable, computed } from 'mobx'
import {
  userStore,
  usersStore,
  timelineStore,
  tinygrailStore,
  systemStore,
  rakuenStore
} from '@stores'
import store from '@utils/store'
import { x18 } from '@utils/app'
import { fetchHTML, t } from '@utils/fetch'
import { HTMLDecode } from '@utils/html'
import { info, loading, feedback } from '@utils/ui'
import { HOST } from '@constants'
import { MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants/model'
import { H_BG, H_RADIUS_LINE, H_HEADER, H_TABBAR } from '../v2/store'

export { H_BG, H_RADIUS_LINE, H_HEADER, H_TABBAR }
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
    title: '超展开',
    key: 'rakuen'
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
const excludeState = {
  visible: false,
  timeout: false,
  originUid: false
}

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
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(undefined, namespace)) || {}
    this.setState({
      ...state,
      page: this.isFromTinygrail
        ? tabsWithTinygrail.findIndex(item => item.key === 'tinygrail')
        : 0,
      ...excludeState,
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

  @computed get userTopicsFormCDN() {
    const { advance } = systemStore
    const { id, username } = this.usersInfo
    const userTopics = rakuenStore.userTopicsFormCDN(username || id)
    if (advance) {
      return userTopics
    }

    const filterCount = 8
    const list = userTopics.list.filter((item, index) => index < filterCount)
    return {
      ...userTopics,
      list,
      _filter: userTopics.list.length - filterCount
    }
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
    const src = avatars ? String(avatars[1]).trim() : ''
    return /(jpg|jpeg|png|bmp|gif)$/.test(src) ? src : ''
  }

  @computed get src() {
    const { _image } = this.params
    const { avatar = {} } = this.usersInfo
    return this.avatar || _image || avatar.large
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

  fetchUserCollections = () => userStore.fetchUserCollections(undefined, this.userId)

  fetchUsersTimeline = refresh =>
    timelineStore.fetchUsersTimeline(
      {
        userId: this.userId
      },
      refresh
    )

  fetchUsers = () =>
    usersStore.fetchUsers({
      userId: this.userId
    })

  fetchCharaAssets = () => tinygrailStore.fetchUserAssets(this.username)

  fetchTempleTotal = () => tinygrailStore.fetchTempleTotal(this.username)

  fetchCharaTotal = () => tinygrailStore.fetchCharaTotal(this.username)

  fetchUserTopicsFormCDN = () => {
    const { id, username } = this.usersInfo
    return rakuenStore.fetchUserTopicsFormCDN(username || id)
  }

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
      this.fetchUsersTimeline(true)
    }

    if (title === '超展开') {
      this.fetchUserTopicsFormCDN()
      setTimeout(() => this.checkUserTopicsIsTimeout(), 3600)
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

  checkUserTopicsIsTimeout = () => {
    if (this.userTopicsFormCDN.list.length === 0) {
      this.setState({
        timeout: true
      })
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

  openUsedModal = () => {
    this.setState({
      visible: true
    })
  }

  closeUsedModal = () => {
    this.setState({
      visible: false
    })
  }

  toggleOriginUid = () => {
    const { originUid } = this.state
    this.setState({
      originUid: !originUid
    })
  }

  /**
   * 显示好友状态
   *  - 在 timelineStore 查找添加好友的时间, 最多请求 3 页
   */
  logFriendStatus = async () => {
    const { username } = this.usersInfo
    const query = {
      scope: MODEL_TIMELINE_SCOPE.getValue('自己'),
      type: MODEL_TIMELINE_TYPE.getValue('好友')
    }

    const hide = loading('查询好友信息中...')
    let data = await timelineStore.fetchTimeline(query, true)
    let find = data.list.find(item => item?.p3?.url?.[0]?.includes(`/user/${username}`))

    if (!find) {
      await timelineStore.fetchTimeline(query)
      await timelineStore.fetchTimeline(query)
      data = await timelineStore.fetchTimeline(query)
    }
    find = data.list.find(item => item?.p3?.url?.[0]?.includes(`/user/${username}`))

    hide()
    if (!find) return info('是你的好友')

    const { time } = find
    return info(`${time.split(' · ')[0]}加为了好友`)
  }

  /**
   * 底部TabBar再次点击滚动到顶并刷新数据
   */
  scrollToOffset = {}
  scrollTo = {}
  connectRef = (ref, index) => {
    this.scrollToOffset[index] = ref?.scrollToOffset

    // android: scrollResponderScrollTo, ios: scrollTo
    this.scrollTo[index] = ref?.scrollResponderScrollTo || ref?.scrollTo
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
      feedback()
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
      feedback()
      info('已解除好友')
      this.fetchUsers()
    }
  }
}
