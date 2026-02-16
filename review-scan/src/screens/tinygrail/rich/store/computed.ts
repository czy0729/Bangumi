/*
 * @Author: czy0729
 * @Date: 2025-07-08 15:49:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-08 15:49:52
 */
import { computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { UserId } from '@types'
import { TABS } from '../ds'
import State from './state'

export default class Computed extends State {
  key(page: number) {
    return computed(() => TABS[page].key).get()
  }

  title(page: number) {
    return computed(() => TABS[page].title).get()
  }

  /** 番市首富 */
  rich(key: string) {
    return computed(() => tinygrailStore.rich(key)).get()
  }

  /** 用户现金 */
  balance(userId: UserId) {
    return computed(() => this.state.balance[userId] || 0).get()
  }
}
