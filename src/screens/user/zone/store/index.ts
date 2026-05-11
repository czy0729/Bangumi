/*
 * @Author: czy0729
 * @Date: 2024-04-08 18:35:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-11 07:48:57
 */
import { queue } from '@utils'
import { WEB } from '@constants'
import Action from './action'
import { updateTrackUserInfo } from './utils'
import { EXCLUDE_STATE } from './ds'

import type { STATE } from './ds'

/** 用户空间页面状态机 */
export default class ScreenZone extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(
      this.namespace
    )
    const state: typeof STATE = {
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    }

    if (!this.state._loaded) {
      if (state.page > 1) state.page = 0
    } else {
      // 若多次进入同一个用户空间, 保持 Tabs 索引位置
      state.page = this.state.page
    }
    this.setState(state)

    return queue([
      () => this.withFocus(() => this.onTabChangeCallback(this.state.page), 'onTabChangeCallback'),
      () => this.withFocus(() => this.fetchUsersInfo(), 'fetchUsersInfo'),
      () => this.withFocus(() => this.fetchUsersFromOSS(), 'fetchUsersFromOSS'),
      () => this.withFocus(() => this.fetchUsers(), 'fetchUsers'),
      () => this.withFocus(() => this.fetchCharaAssets(), 'fetchCharaAssets', !this.fromTinygrail),
      () => this.withFocus(() => this.fetchTempleTotal(), 'fetchTempleTotal', !this.fromTinygrail),
      () => this.withFocus(() => this.fetchCharaTotal(), 'fetchCharaTotal', !this.fromTinygrail),
      () => this.withFocus(() => this.fetchUsersTimeline(true), 'fetchUsersTimeline'),
      () => this.withFocus(() => this.fetchRecent(), 'fetchRecent', !WEB),
      () => this.withFocus(() => updateTrackUserInfo(this.usersInfo), 'updateTrackUserInfo', !WEB)
    ])
  }

  /** 每个请求都判断 this.state.focused 判断用户在未请求完就退出页面需要尽快终止余下请求 */
  private withFocus<T>(fn: () => T, desc: string = '', extraCondition: boolean = true) {
    if (!this.state.focused) {
      this.warn('withFocus', 'cancel', `(${desc})`)
      return
    }

    if (!extraCondition) {
      this.warn('withFocus', 'extraCondition cancel', `(${desc})`)
      return
    }

    this.log(desc)
    return fn()
  }
}
