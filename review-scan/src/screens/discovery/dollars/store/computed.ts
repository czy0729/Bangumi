/*
 * @Author: czy0729
 * @Date: 2024-12-03 13:42:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-03 13:42:37
 */
import { computed } from 'mobx'
import { discoveryStore, userStore } from '@stores'
import State from './state'

export default class Computed extends State {
  /** 是否登录 (web) */
  @computed get isWebLogin() {
    return userStore.isWebLogin
  }

  @computed get dollars() {
    return discoveryStore.dollars
  }
}
