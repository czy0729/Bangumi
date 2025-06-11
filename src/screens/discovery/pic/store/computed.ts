/*
 * @Author: czy0729
 * @Date: 2025-06-09 14:50:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-12 00:54:59
 */
import { computed } from 'mobx'
import { Id } from '@types'
import State from './state'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class Computed extends State {
  save = () => {
    return this.saveStorage(this.namespace, EXCLUDE_STATE)
  }

  /** 搜索关键字 */
  @computed get keyword() {
    return this.params.name || ''
  }

  /** 页面唯一命名空间 */
  @computed get namespace() {
    return `${NAMESPACE}|${this.keyword}`
  }

  @computed get list() {
    return this.state.list[this.state.page] || []
  }

  @computed get filterList() {
    const { filter } = this.state
    if (!filter) return this.list

    return this.list.filter(item => `,${item.tags},`.includes(`,${filter},`))
  }

  image(id: Id) {
    return computed(() => {
      return this.state.srcs[`pic_tag_${id}`]
    }).get()
  }

  tags(page: number = 1) {
    return computed(() => {
      const data = this.state.list[page] || []
      const map: Record<string, number> = {}
      data.forEach(item => {
        ;(item.tags || '').split(',').forEach(i => {
          const tag = i.trim()
          if (tag) map[tag] = map[tag] ? map[tag] + 1 : 1
        })
      })

      const entries = Object.entries(map)
      entries.sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1]

        return a[0].localeCompare(b[0])
      })

      return entries.map(([name, count]) => `${name} (${count})`)
    }).get()
  }
}
