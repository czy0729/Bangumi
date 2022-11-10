/*
 * @Author: czy0729
 * @Date: 2020-03-08 20:48:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-09 06:39:06
 */
import { computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'

export default class ScreenTinygrailTopWeek extends store {
  init = () => {
    return this.fetchTopWeek()
  }

  // -------------------- fetch --------------------
  /** 每周萌王 */
  fetchTopWeek = () => {
    return tinygrailStore.fetchTopWeek()
  }

  // -------------------- get --------------------
  /** 每周萌王 */
  @computed get topWeek() {
    return tinygrailStore.topWeek
  }
}
