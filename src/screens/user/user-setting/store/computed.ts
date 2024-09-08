/*
 * @Author: czy0729
 * @Date: 2024-09-08 13:36:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 13:37:58
 */
import { computed } from 'mobx'
import { usersStore, userStore } from '@stores'
import { HTMLDecode } from '@utils'
import { REG_AVATAR, REG_BG, REG_FIXED } from '../ds'
import State from './state'

export default class Computed extends State {
  @computed get userSetting() {
    return userStore.userSetting
  }

  @computed get myUserId() {
    return userStore.myUserId
  }

  @computed get usersInfo() {
    return userStore.usersInfo(this.myUserId)
  }

  @computed get users() {
    return usersStore.users(this.myUserId)
  }

  @computed get bg() {
    const { bg } = this.state
    if (bg) return bg

    const { sign } = this.userSetting
    const _bgs = sign.match(REG_BG)
    return HTMLDecode(String(_bgs ? String(_bgs[1]).trim() : '').replace(REG_FIXED, ''))
  }

  @computed get avatar() {
    const { avatar } = this.state
    if (avatar) return avatar

    const { sign } = this.userSetting
    const _avatars = sign.match(REG_AVATAR)
    return HTMLDecode(String(_avatars ? String(_avatars[1]).trim() : '').replace(REG_FIXED, ''))
  }
}
