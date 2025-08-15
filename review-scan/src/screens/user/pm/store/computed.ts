/*
 * @Author: czy0729
 * @Date: 2024-09-13 00:50:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-15 04:44:58
 */
import { computed } from 'mobx'
import { userStore } from '@stores'
import { HTML_PM_DETAIL } from '@constants'
import State from './state'

export default class Computed extends State {
  /** 已有 ID, 没有为新建 */
  @computed get id() {
    return this.params.id
  }

  /** 必须是数字 ID, 用于发新短信 */
  @computed get userId() {
    return this.params.userId
  }

  /** 短信详情 */
  @computed get pmDetail() {
    return userStore.pmDetail(this.id)
  }

  /** 新短信参数 */
  @computed get pmParams() {
    return userStore.pmParams(this.userId)
  }

  /** 自己用户 ID (改过用户名后) */
  @computed get myId() {
    return userStore.myId
  }

  /** 网址 */
  @computed get url() {
    return HTML_PM_DETAIL(this.id)
  }
}
