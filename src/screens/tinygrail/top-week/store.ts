/*
 * @Author: czy0729
 * @Date: 2020-03-08 20:48:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 06:41:05
 */
import { computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'

export default class ScreenTinygrailTopWeek extends store<null> {
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
