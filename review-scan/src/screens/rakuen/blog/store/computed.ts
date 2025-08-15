/*
 * @Author: czy0729
 * @Date: 2024-06-21 05:06:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-16 09:07:35
 */
import { computed } from 'mobx'
import { rakuenStore, systemStore, usersStore, userStore } from '@stores'
import { HTMLDecode } from '@utils'
import { HOST } from '@constants'
import State from './state'
import { NAMESPACE } from './ds'

export default class Computed extends State {
  /** 日志 Id */
  @computed get blogId() {
    const { blogId = '' } = this.params
    if (!blogId) return '0'

    return String(blogId).split('#')[0]
  }

  /** 需要跳转到的楼层 Id */
  @computed get postId() {
    const { blogId = '' } = this.params
    const [, postId] = String(blogId).split('#post_')
    return postId
  }

  @computed get namespace() {
    return `${NAMESPACE}|${this.blogId}`
  }

  /** 是否本地收藏 */
  @computed get isFavor() {
    return rakuenStore.favorV2(`blog/${this.blogId}`)
  }

  /** 收藏人数 */
  @computed get favorCount() {
    return rakuenStore.favorCount(`blog/${this.blogId}`)
  }

  /** 日志内容 */
  @computed get blog() {
    const blog = rakuenStore.blog(this.blogId)
    if (!blog._loaded) return this.ota || {}

    return blog
  }

  /** 日志回复 */
  @computed get comments() {
    return rakuenStore.blogComments(this.blogId)
  }

  /** 是否登录 (web) */
  @computed get isWebLogin() {
    return userStore.isWebLogin
  }

  @computed get readed() {
    return true
  }

  /** 自己用户 Id (改过后的) */
  @computed get myId() {
    return userStore.myId
  }

  /** 我的好友 userId 哈希映射 */
  @computed get myFriendsMap() {
    return usersStore.myFriendsMap
  }

  /** 超展开设置 */
  @computed get setting() {
    return rakuenStore.setting
  }

  /** 云快照 */
  @computed get ota() {
    const { ota } = this.state
    return ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey() {
    return `blog_${this.blogId}`
  }

  // -------------------- cdn fallback --------------------
  @computed get title() {
    return HTMLDecode(this.blog.title || this.params._title || '')
  }

  @computed get time() {
    return this.blog.time || this.params._time || ''
  }

  @computed get avatar() {
    return this.blog.avatar || this.params._avatar || ''
  }

  @computed get userId() {
    return this.blog.userId || this.params._userId || ''
  }

  @computed get userName() {
    return this.blog.userName || this.params._userName || ''
  }

  @computed get userSign() {
    return this.blog.userSign || ''
  }

  @computed get html() {
    return this.blog.message || ''
  }

  @computed get isUGCAgree() {
    return systemStore.isUGCAgree
  }

  @computed get url() {
    return this.params?._url || `${HOST}/blog/${this.blogId}`
  }

  @computed get hm() {
    return [this.url, 'Blog']
  }

  @computed get currentChatValues() {
    return this.state.chat[systemStore.setting.musumePrompt] || []
  }
}
