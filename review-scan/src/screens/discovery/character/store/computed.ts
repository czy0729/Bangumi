/*
 * @Author: czy0729
 * @Date: 2024-12-03 15:36:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-03 16:55:54
 */
import { computed } from 'mobx'
import { usersStore, userStore } from '@stores'
import { HOST } from '@constants'
import { TABS, TABS_SELF } from '../ds'
import { Keys } from '../types'
import State from './state'

export default class Computed extends State {
  @computed get userId() {
    return this.params.userName || userStore.myId
  }

  @computed get tabs() {
    return this.userId === userStore.myId ? TABS_SELF : TABS
  }

  @computed get id(): Keys {
    return this.tabs?.[this.state.page]?.key || TABS[0].key
  }

  list(key: Keys) {
    return computed(() => {
      if (key === 'persons') return usersStore.persons(this.userId)
      if (key === 'recents') return usersStore.recents
      return usersStore.characters(this.userId)
    }).get()
  }

  @computed get url() {
    return `${HOST}/user/${this.params?.userName}/mono`
  }

  @computed get hm() {
    return [this.url, 'Character']
  }
}
