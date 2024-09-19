/*
 * @Author: czy0729
 * @Date: 2024-09-19 21:07:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-19 21:10:39
 */
import { computed } from 'mobx'
import { ListItem } from '../types'
import State from './state'

export default class Computed extends State {
  @computed get list(): ListItem[] {
    try {
      return JSON.parse(this.params._list)
    } catch (error) {}

    return []
  }
}
