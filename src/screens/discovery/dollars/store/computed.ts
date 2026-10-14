/*
 * @Author: czy0729
 * @Date: 2024-12-03 13:42:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 17:31:06
 *
 * Dollars 派生: 登录状态 / 列表数据 / 在线人数
 */
import { computed } from 'mobx'
import { discoveryStore, userStore } from '@stores'
import { getDollarsOnline } from '@stores/discovery/utils'
import { getTimestamp } from '@utils'
import State from './state'

export default class Computed extends State {
  /** 是否登录 (web) */
  @computed get isWebLogin() {
    return userStore.isWebLogin
  }

  /** 留言板数据 */
  @computed get dollars() {
    return discoveryStore.dollars
  }

  /** 1 小时内独立发布过消息的用户数 */
  @computed get online() {
    return getDollarsOnline(this.dollars.list, getTimestamp())
  }
}
