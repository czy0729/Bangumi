/*
 * @Author: czy0729
 * @Date: 2024-08-21 17:11:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 17:11:47
 *
 * 新番档期派生: 目录创建者与用户目录
 */
import { computed } from 'mobx'
import { usersStore } from '@stores'
import { DATA_USERS, DEFAULT_USER_ID } from '../ds'
import State from './state'

export default class Computed extends State {
  /** 当前目录创建者 */
  @computed get userId() {
    const { userId } = this.state
    return DATA_USERS.some(item => item.userId === userId) ? userId : DEFAULT_USER_ID
  }

  /** 当前目录创建者用户名 */
  @computed get userName() {
    return DATA_USERS.find(item => item.userId === this.userId)?.userName ?? DATA_USERS[0].userName
  }

  /** HM 埋点参数 */
  @computed get hm() {
    return [`user/${this.userId}/index`, 'Staff'] as const
  }

  /** 用户目录 */
  @computed get catalogs() {
    return usersStore.catalogs(this.userId, false)
  }
}
