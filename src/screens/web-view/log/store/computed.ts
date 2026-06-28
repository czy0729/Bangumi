/*
 * @Author: czy0729
 * @Date: 2025-02-19 07:51:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 06:46:45
 */
import { computed } from 'mobx'
import { computedFn } from 'mobx-utils'
import { lastDate } from '@utils'
import State from './state'

export default class Computed extends State {
  users = computedFn((u: string) => {
    const id = u.split('user/')?.[1]
    if (!id || !(id in this.state.users)) return null
    return this.state.users[id]
  })

  infos = computedFn((u: string) => {
    const id = u.split('user/')?.[1]
    if (!id || !(id in this.state.infos)) return null
    return this.state.infos[id]
  })

  stats = computedFn((u: string) => {
    return this.state.stats[u] || null
  })

  @computed get headerInfo() {
    const { list } = this.state.data
    const { length } = list
    let text = String(length)
    if (length == 0) return text

    text += ` (${lastDate(new Date(list[length - 1].d).valueOf() / 1000)})`
    return text
  }
}
