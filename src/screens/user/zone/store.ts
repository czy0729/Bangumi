/*
 * 用户控件
 * @Params: { _id, _name, _image }
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-28 07:44:17
 */
import { Animated } from 'react-native'
import { observable, computed } from 'mobx'
import {
  _,
  userStore,
  usersStore,
  timelineStore,
  tinygrailStore,
  systemStore,
  rakuenStore
} from '@stores'
import { HTMLDecode, info, loading, feedback } from '@utils'
import store from '@utils/store'
import { fetchHTML, t } from '@utils/fetch'
import { fixedRemote } from '@utils/user-setting'
import { HOST, MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants'
import { Navigation, TimeLineScope, TimeLineType } from '@types'
import { H_RADIUS_LINE, H_HEADER, H_TABBAR } from '../v2/ds'
import { NAMESPACE, STATE, EXCLUDE_STATE, TABS, TABS_WITH_TINYGRAIL } from './ds'
import { Params } from './types'

export { H_RADIUS_LINE, H_HEADER, H_TABBAR }

export default class ScreenZone extends store {
  params: Params

  state = observable(STATE)

  scrollY = new Animated.Value(0)

  y = 0

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      ...state,
      page: this.fromTinygrail
        ? TABS_WITH_TINYGRAIL.findIndex(item => item.key === 'tinygrail')
        : 0,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    if (this.fromTinygrail) {
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
  /** 标签页数据 */
  @computed get tabs() {
    const { tinygrail } = systemStore.setting
    return tinygrail ? TABS_WITH_TINYGRAIL : TABS
  }

  /** 是否从小圣杯模块跳转过来 */
  @computed get fromTinygrail() {
    const { from } = this.params
    return from === 'tinygrail'
  }

  /** 用户原始 userId (数字) */
  @computed get userId() {
    return this.params?.userId || ''
  }

  /** 用户信息 */
  @computed get usersInfo() {
    return userStore.usersInfo(this.userId)
  }

  /** 用户自定义唯一 userId */
  @computed get username() {
    return this.usersInfo.username
  }

  /** 用户番剧收藏 */
  @computed get userCollections() {
    return userStore.userCollections(undefined, this.userId)
  }

  /** 用户时间胶囊 */
  @computed get usersTimeline() {
    return timelineStore.usersTimeline(this.userId)
  }

  /** 用户历史帖子 (网页没有此功能, 数据为自行整理) */
  @computed get userTopicsFormCDN() {
    const { advance } = systemStore
    const { id, username } = this.usersInfo
    const userTopics = rakuenStore.userTopicsFormCDN(username || id)
    if (advance) return userTopics

    const filterCount = 8
    const list = userTopics.list.filter((item, index) => index < filterCount)
    return {
      ...userTopics,
      list,
      _filter: userTopics.list.length - filterCount
    }
  }

  /** 用户信息 */
  @computed get users() {
    return usersStore.users(this.userId)
  }

  /** 自定义背景 */
  @computed get bg() {
    const { sign = '' } = this.users
    const bgs = sign.match(/\[bg\](.+?)\[\/bg\]/)
    return fixedRemote(HTMLDecode(bgs ? String(bgs[1]).trim() : ''))
  }

  /** 自定义头像 */
  @computed get avatar() {
    const { sign = '' } = this.users
    const avatars = sign.match(/\[avatar\](.+?)\[\/avatar\]/)
    const src = avatars ? String(avatars[1]).trim() : ''
    return fixedRemote(HTMLDecode(src), true)
  }

  /** 实际显示头像地址 */
  @computed get src() {
    const { _image } = this.params
    const { avatar } = this.usersInfo
    return this.avatar || _image || avatar?.large
  }

  /** 小圣杯 / 用户资产 */
  @computed get userAssets() {
    // @ts-ignore
    return tinygrailStore.userAssets(this.username)
  }

  /** 小圣杯 / 总圣殿数 */
  @computed get templeTotal() {
    // @ts-ignore
    return tinygrailStore.templeTotal(this.username)
  }

  /** 小圣杯 / 总人物数 */
  @computed get charaTotal() {
    // @ts-ignore
    return tinygrailStore.charaTotal(this.username)
  }

  @computed get h_fixed() {
    return _.parallaxImageHeight - H_HEADER
  }

  @computed get advanceDetail() {
    if (!userStore.isDeveloper) return ''
    return systemStore.advanceDetail[this.userId || this.username]
  }

  @computed get isAdvance() {
    return systemStore.isAdvance(this.userId, this.username)
  }

  // -------------------- fetch --------------------
  /** 用户信息 (自己视角) */
  fetchUsersInfo = () => {
    return userStore.fetchUsersInfo(this.userId)
  }

  /** 用户信息 (他人视角) */
  fetchUsers = () => {
    return usersStore.fetchUsers({
      userId: this.userId
    })
  }

  /** 用户番剧信息 */
  fetchUserCollections = () => {
    return userStore.fetchUserCollections(undefined, this.userId)
  }

  /** 用户时间胶囊 */
  fetchUsersTimeline = (refresh: boolean = false) => {
    return timelineStore.fetchUsersTimeline(
      {
        userId: this.userId
      },
      refresh
    )
  }

  /** 用户历史帖子 */
  fetchUserTopicsFormCDN = () => {
    const { id, username } = this.usersInfo
    return rakuenStore.fetchUserTopicsFormCDN(username || id)
  }

  /** 小圣杯 / 用户资产 */
  fetchCharaAssets = () => {
    return tinygrailStore.fetchUserAssets(this.username)
  }

  /** 小圣杯 / 总圣殿数 */
  fetchTempleTotal = () => {
    return tinygrailStore.fetchTempleTotal(this.username)
  }

  /** 小圣杯 / 总人物数 */
  fetchCharaTotal = () => {
    return tinygrailStore.fetchCharaTotal(this.username)
  }

  // -------------------- page --------------------
  scrollToOffset = {}

  scrollTo = {}

  /** 收集 ListView | ScrollView 引用 */
  connectRef = (ref: any, index: number) => {
    this.scrollToOffset[index] = ref?.scrollToOffset

    // android: scrollResponderScrollTo, ios: scrollTo
    this.scrollTo[index] = ref?.scrollResponderScrollTo || ref?.scrollTo
  }

  /** 使用合适的方法滚动到指定位置 */
  updatePageOffset = (index: number[] = [-1, 1]) => {
    const { page, fixed } = this.state

    const offset = fixed ? this.h_fixed : this.y
    index.forEach(item => {
      const scrollToOffset = this.scrollToOffset[page + item]
      if (typeof scrollToOffset === 'function') {
        scrollToOffset({
          offset,
          animated: false
        })
      } else {
        const scrollTo = this.scrollTo[page + item]
        if (typeof scrollTo === 'function') {
          scrollTo({
            y: offset,
            animated: false
          })
        }
      }
    })
  }

  /** 滚动事件, 控制顶部背景是否固定 */
  onScroll = (e: {
    nativeEvent: {
      contentOffset: {
        y: any
      }
    }
  }) => {
    const { fixed } = this.state
    const { y } = e.nativeEvent.contentOffset
    this.y = y

    const offset = this.h_fixed - 20
    if (fixed && y < offset) {
      this.setState({
        fixed: false
      })
      return
    }

    if (!fixed && y >= offset) {
      this.setState({
        fixed: true
      })
    }
  }

  /** 标签页切换 */
  onTabChange = (page: number) => {
    t('空间.标签页切换', {
      userId: this.userId,
      page
    })

    this.setState({
      page
    })
    this.onTabChangeCallback(page)
  }

  /** 标签页切换后回调, 延迟请求对应页面数据 */
  onTabChangeCallback = async (page: number) => {
    const { title } = this.tabs[page]
    if (title === '时间胶囊') {
      await this.fetchUsersTimeline(true)
    } else if (title === '超展开') {
      this.checkUserTopicsIsTimeout()
      await this.fetchUserTopicsFormCDN()
    } else if (title === '番剧' && this.fromTinygrail) {
      await this.fetchUserCollections()
    } else if (title === '小圣杯' && !this.fromTinygrail) {
      await this.fetchCharaAssets()
      await this.fetchTempleTotal()
      await this.fetchCharaTotal()
    }

    setTimeout(() => this.updatePageOffset([0]), 0)
  }

  /** 若干秒后, 若用户帖子为空, 认为该用户没有发过帖子 */
  checkUserTopicsIsTimeout = () => {
    setTimeout(() => {
      if (this.userTopicsFormCDN.list.length === 0) {
        this.setState({
          timeout: true
        })
      }
    }, 3600)
  }

  /** 番剧展开分组 */
  onToggleSection = (title: string) => {
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
    this.setStorage(NAMESPACE)
  }

  /** 去用户的所有收藏页面 */
  navigateToUser = (navigation: Navigation) => {
    const { _name } = this.params
    const { avatar, nickname, username } = this.usersInfo
    navigation.push('User', {
      userId: username,
      _name: HTMLDecode(nickname || _name),
      _image: avatar?.large
    })
  }

  /** 打开用户信息历史 */
  openUsedModal = () => {
    this.setState({
      visible: true
    })
  }

  /** 关闭用户信息历史 */
  closeUsedModal = () => {
    this.setState({
      visible: false
    })
  }

  /** 切换用户原始 Id */
  toggleOriginUid = () => {
    const { originUid } = this.state
    this.setState({
      originUid: !originUid
    })
  }

  /** 显示好友状态 (在 timelineStore 查找添加好友的时间, 最多请求 3 页) */
  logFriendStatus = async () => {
    const { username } = this.usersInfo
    const query = {
      scope: MODEL_TIMELINE_SCOPE.getValue<TimeLineScope>('自己'),
      type: MODEL_TIMELINE_TYPE.getValue<TimeLineType>('好友')
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

  // -------------------- action --------------------
  /** 添加好友 */
  doConnect = async () => {
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

  /** 解除好友 */
  doDisconnect = async () => {
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

  /** 删除时间线 */
  doDelete = async (href: string) => {
    if (!href) return false

    const res = fetchHTML({
      method: 'POST',
      url: href
    })
    await res
    feedback()

    this.fetchUsersTimeline(true)
    return res
  }
}
