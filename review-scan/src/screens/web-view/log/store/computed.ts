/*
 * @Author: czy0729
 * @Date: 2025-02-19 07:51:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 06:46:45
 */
import { computed } from 'mobx'
import { lastDate } from '@utils'
import State from './state'

export default class Computed extends State {
  users(u: string) {
    return computed(() => {
      const id = u.split('user/')?.[1]
      if (!id || !(id in this.state.users)) return null
      return this.state.users[id]
    }).get()
  }

  infos(u: string) {
    return computed(() => {
      const id = u.split('user/')?.[1]
      if (!id || !(id in this.state.infos)) return null
      return this.state.infos[id]
    }).get()
  }

  stats(u: string) {
    return computed(() => {
      return this.state.stats[u] || null
    }).get()
  }

  @computed get headerInfo() {
    const { list } = this.state.data
    const { length } = list
    let text = String(length)
    if (length == 0) return text

    text += ` (${lastDate(new Date(list[length - 1].d).valueOf() / 1000)})`
    return text
  }
}
