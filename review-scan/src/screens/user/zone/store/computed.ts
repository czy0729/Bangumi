/*
 * @Author: czy0729
 * @Date: 2024-04-08 12:49:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-16 07:45:52
 */
import { computed } from 'mobx'
import { fixedHD, getCDNAvatar } from '@components/avatar/utils'
import { fixedRemoteImageUrl } from '@components/image/utils'
import {
  _,
  rakuenStore,
  systemStore,
  timelineStore,
  tinygrailStore,
  usersStore,
  userStore
} from '@stores'
import { getBlurRadius, HTMLDecode } from '@utils'
import { fixedRemote } from '@utils/user-setting'
import { IMG_EMPTY_DARK, TEXT_ONLY } from '@constants'
import { H_HEADER } from '@screens/user/v2/ds'
import { ImageSource } from '@types'
import { TABS, TABS_WITH_TINYGRAIL } from '../ds'
import State from './state'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class Computed extends State {
  /** 本地化 */
  save = () => {
    return this.saveStorage(this.namespace, EXCLUDE_STATE)
  }

  /** 页面唯一命名空间 */
  @computed get namespace() {
    return `${NAMESPACE}|${this.userId}`
  }

  /** 标签页数据 */
  @computed get tabs() {
    return systemStore.setting.tinygrail ? TABS_WITH_TINYGRAIL : TABS
  }

  /** 是否从小圣杯模块跳转过来 */
  @computed get fromTinygrail() {
    return this.params.from === 'tinygrail'
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

  /** 用户番剧收藏 section list data */
  @computed get sections() {
    return this.userCollections.list.map(item => ({
      title: item.status,
      count: item.count,
      data: [
        {
          list: item.list
        }
      ]
    }))
  }

  /** 用户时间胶囊 */
  @computed get usersTimeline() {
    return timelineStore.usersTimeline(this.userId)
  }

  /** 用户历史帖子 (网页没有此功能, 数据为自行整理) */
  @computed get userTopicsFormCDN() {
    const userTopics = rakuenStore.userTopicsFormCDN(this.usersInfo.username || this.usersInfo.id)
    if (systemStore.advance) return userTopics

    const filterCount = 8
    if (userTopics.list.length <= filterCount) return userTopics

    return {
      ...userTopics,
      list: userTopics.list.filter((_item, index) => index < filterCount),
      _filter: userTopics.list.length - filterCount
    }
  }

  /** 用户信息 */
  @computed get users() {
    const users = usersStore.users(this.userId)
    if (users._loaded) return users

    return this.state.users
  }

  /** 最近 */
  @computed get recent() {
    const { username } = this.usersInfo
    if (!username) return false

    return this.state.recent[username] || false
  }

  /** 自定义背景 */
  @computed get bg() {
    if (!this.recent) return ''

    const { sign = '' } = this.users
    const bgs = sign.match(/\[bg\](.+?)\[\/bg\]/)
    return fixedRemote(HTMLDecode(bgs ? String(bgs[1]).trim() : ''))
  }

  /** 自定义头像 */
  @computed get avatar() {
    if (!this.recent) return ''

    const { sign = '' } = this.users
    const avatars = sign.match(/\[avatar\](.+?)\[\/avatar\]/)
    const src = avatars ? String(avatars[1]).trim() : ''
    return fixedRemote(HTMLDecode(src), true)
  }

  /** 实际显示头像地址 */
  @computed get src() {
    return fixedRemoteImageUrl(
      getCDNAvatar(
        fixedHD(this.avatar || this.params._image || this.usersInfo.avatar?.large),
        'bgm_poster_200'
      )
    )
  }

  /** 实际背景 */
  @computed get imageSource() {
    const { _image } = this.params
    const { avatar } = this.usersInfo
    let source: ImageSource = {
      uri: avatar?.large
    }

    if (TEXT_ONLY) {
      source = IMG_EMPTY_DARK
    } else {
      if (typeof _image === 'string') source.uri = _image
      source.uri = fixedHD(this.bg || this.avatar || source.uri)
    }

    return source
  }

  /** 背景模糊像素 */
  @computed get blurRadius() {
    return getBlurRadius(this.imageSource.uri, this.bg, this.usersInfo.avatar?.large)
  }

  /** 用户昵称 */
  @computed get nickname() {
    return HTMLDecode(this.usersInfo.nickname || this.params._name)
  }

  /** 用户备注 */
  @computed get userRemark() {
    return systemStore.userRemark(this.username)
  }

  /** 去除客户端高清头像背景的代码 */
  @computed get content() {
    let text = String(this.users.sign || '')
      .replace(/<span style="font-size:0px; line-height:0px;">(.+?)<\/span>/g, '')
      .replace(/\[(bg|avatar)\].*?\[\/\1\]/g, '')

    // 以前是 font-size: 0, 后来网站貌似改掉了至少是 8px, 所以需要主动清理
    text = text.replace(/<span style="font-size:8px; line-height:8px;"><\/span>/g, '').trim()

    return text
  }

  /** 小圣杯 / 用户资产 */
  @computed get userAssets() {
    return tinygrailStore.userAssets(this.username)
  }

  /** 小圣杯 / 总圣殿数 */
  @computed get templeTotal() {
    return tinygrailStore.templeTotal(this.username)
  }

  /** 小圣杯 / 总人物数 */
  @computed get charaTotal() {
    return tinygrailStore.charaTotal(this.username)
  }

  @computed get h_fixed() {
    return _.parallaxImageHeight - H_HEADER
  }

  @computed get isAdvance() {
    return systemStore.isAdvance(this.userId, this.username)
  }

  @computed get advanceDetail() {
    if (!userStore.isDeveloper) return ''

    return systemStore.advanceDetail[this.userId || this.username]
  }

  @computed get currentChatValues() {
    return this.state.chat[systemStore.setting.musumePrompt] || []
  }
}
