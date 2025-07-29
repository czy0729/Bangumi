/*
 * @Author: czy0729
 * @Date: 2025-07-26 21:32:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-26 21:32:52
 */
import { computed } from 'mobx'
import { tinygrailStore } from '@stores'
import State from './state'

export default class Computed extends State {
  /** 每周萌王 */
  @computed get topWeek() {
    return tinygrailStore.topWeek
  }
}
