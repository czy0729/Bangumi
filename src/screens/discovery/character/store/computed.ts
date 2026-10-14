/*
 * @Author: czy0729
 * @Date: 2024-12-03 15:36:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 人物派生: 用户 / 标签页 / 列表
 */
import { computed } from 'mobx'
import { usersStore, userStore } from '@stores'
import { HOST } from '@constants'
import { TABS, TABS_SELF } from '../ds'
import State from './state'

import type { Keys } from '../types'

export default class Computed extends State {
  @computed get userId() {
    return this.params.userName || userStore.myId
  }

  /** 自己的人物页多一个近况标签 */
  @computed get tabs() {
    return this.userId === userStore.myId ? TABS_SELF : TABS
  }

  /** 当前标签页 key */
  @computed get id() {
    return this.tabs?.[this.state.page]?.key || TABS[0].key
  }

  @computed get title() {
    return this.tabs?.[this.state.page]?.title || TABS[0].title
  }

  @computed get loading() {
    return !this.list(this.id)._loaded
  }

  @computed get url() {
    return `${HOST}/user/${this.params?.userName || userStore.myId}/mono`
  }

  @computed get hm() {
    return [this.url, 'Character'] as const
  }

  /** 标签页对应的列表数据 */
  list(key: Keys) {
    if (key === 'persons') return usersStore.persons(this.userId)
    if (key === 'recents') return usersStore.recents
    return usersStore.characters(this.userId)
  }
}
