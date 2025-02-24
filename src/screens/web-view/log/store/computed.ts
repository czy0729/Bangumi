/*
 * @Author: czy0729
 * @Date: 2025-02-19 07:51:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-22 11:35:30
 */
import { computed } from 'mobx'
import State from './state'

export default class Computed extends State {
  users(u: string) {
    return computed(() => {
      const id = u.split('user/')?.[1]
      if (!id) return null
      return this.state.users[id]
    }).get()
  }

  infos(u: string) {
    return computed(() => {
      const id = u.split('user/')?.[1]
      if (!id) return null
      return this.state.infos[id]
    }).get()
  }

  stats(u: string) {
    return computed(() => {
      return this.state.stats[u] || null
    }).get()
  }
}
