/*
 * @Author: czy0729
 * @Date: 2024-09-14 06:47:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 14:43:56
 *
 * 用户日志页派生数据
 */
import { computed } from 'mobx'
import { usersStore, userStore } from '@stores'
import { HTML_USERS_BLOGS } from '@constants'
import State from './state'

export default class Computed extends State {
  /** 用户 ID, 未指定时取当前登录用户 */
  @computed get userId() {
    return this.params.userId || userStore.myId
  }

  /** 用户日志数据 */
  @computed get blogs() {
    return usersStore.blogs(this.userId)
  }

  /** 用户日志的网页地址 */
  @computed get url() {
    return HTML_USERS_BLOGS(this.userId)
  }

  /** 埋点 */
  @computed get hm() {
    return [this.url, 'Blogs'] as const
  }
}
