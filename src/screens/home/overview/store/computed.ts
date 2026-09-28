/*
 * @Author: czy0729
 * @Date: 2024-09-19 21:07:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 11:00:00
 *
 * 派生: 路由参数解析出原始列表, 再按类型筛选
 */
import { computed } from 'mobx'
import State from './state'

import type { ListItem } from '../types'

export default class Computed extends State {
  @computed get list(): ListItem[] {
    try {
      return JSON.parse(this.params._list) as ListItem[]
    } catch {}

    return []
  }

  @computed get filterList(): ListItem[] {
    const { filter } = this.state
    if (!filter) return this.list

    return this.list.filter(item => item.desc === filter)
  }
}
