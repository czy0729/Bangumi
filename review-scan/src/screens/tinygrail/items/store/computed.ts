/*
 * @Author: czy0729
 * @Date: 2024-12-26 01:04:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-26 01:05:52
 */
import { computed } from 'mobx'
import { tinygrailStore } from '@stores'
import State from './state'

export default class Computed extends State {
  /** 我的道具 */
  @computed get items() {
    return tinygrailStore.items
  }
}
