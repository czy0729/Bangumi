/*
 * @Author: czy0729
 * @Date: 2024-04-08 12:49:58
 * @Last Modified by: imagebuilder1837
 * @Last Modified time: 2026-05-22 02:56:51
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
import { logger } from '@utils/dev'
import { fixedRemote } from '@utils/user-setting'
import { IMG_EMPTY_DARK, TEXT_ONLY } from '@constants'
import { H_HEADER, TABS, TABS_WITH_TINYGRAIL } from '../ds'
import State from './state'
import { COLLECTION_STATUS_MAP, COLLECTION_STATUS_TEXT, EXCLUDE_STATE, NAMESPACE } from './ds'

import type { CollectionStatusCn, ImageSource, SubjectTypeCn } from '@types'

export default class Computed extends State {
  /** 本地化 */
  save = () => {
    return this.saveStorage(this.namespace, EXCLUDE_STATE)
  }

  /** 开发调试 */
  log(...arg: any) {
    logger.info(this.namespace, ...arg)
  }

  /** 开发调试 */
  warn(...arg: any) {
    logger.warn(this.namespace, ...arg)
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

  /** 用户收藏概览 */
  @computed get userCollections() {
    return userStore.userCollections(this.state.collectionType, this.userId)
  }

  /** 当前收藏类型中文 */
  @computed get collectionTypeLabel() {
    switch (this.state.collectionType) {
      case 'book':
        return '书籍' as SubjectTypeCn

      case 'music':
        return '音乐' as SubjectTypeCn

      case 'game':
        return '游戏' as SubjectTypeCn

      case 'real':
        return '三次元' as SubjectTypeCn

      default:
        return '动画' as SubjectTypeCn
    }
  }

  /** 当前收藏状态文案 */
  collectionStatusText(status: CollectionStatusCn) {
    return COLLECTION_STATUS_TEXT[this.state.collectionType]?.[status] || status
  }

  /** 归一成通用收藏状态 */
  collectionStatus(status: string): CollectionStatusCn {
    return COLLECTION_STATUS_MAP[status] || (status as CollectionStatusCn)
  }

  /** 用户收藏概览 section list data */
  @computed get sections() {
    return this.userCollections.list.map(item => {
      const status = this.collectionStatus(item.status)

      return {
        title: this.collectionStatusText(status),
        status,
        count: item.count,
        data: [
          {
            list: item.list
          }
        ]
      }
    })
  }

  /** 用户时间胶囊 */
  @computed get usersTimeline() {
    return timelineStore.usersTimeline(this.userId)
  }

  /** 用户历史帖子 */
  @computed get userTopicsFromCDN() {
    return rakuenStore.userTopicsFromCDN(this.usersInfo.username || this.usersInfo.id)
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
        fixedHD(this.avatar || this.usersInfo.avatar?.large || this.params._image),
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
      if (typeof _image === 'string' && !!_image) source.uri = _image
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
    return systemStore.isAdvance(this.usersInfo.id || this.userId, this.username)
  }

  @computed get advanceDetail() {
    if (!userStore.isDeveloper) return ''

    return (
      systemStore.advanceDetail[this.usersInfo.id] ||
      systemStore.advanceDetail[this.userId] ||
      systemStore.advanceDetail[this.username]
    )
  }

  @computed get currentChatValues() {
    return this.state.chat[systemStore.setting.musumePrompt] || []
  }

  @computed get hm() {
    return [`user/${this.params.userId}?route=zone`, 'Zone'] as const
  }
}
