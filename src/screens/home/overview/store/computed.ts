/*
 * @Author: czy0729
 * @Date: 2024-09-19 21:07:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-02 23:42:51
 */
import { computed } from 'mobx'
import State from './state'

import type { ListItem } from '../types'

export default class Computed extends State {
  @computed get list(): ListItem[] {
    try {
      return JSON.parse(this.params._list)
    } catch (error) {}

    return []
  }
}
