/*
 * @Author: czy0729
 * @Date: 2020-03-08 20:48:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-15 17:22:41
 */
import { computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'

export default class ScreenTinygrailTopWeek extends store {
  init = () => {
    this.fetchTopWeek()
  }

  // -------------------- fetch --------------------
  fetchTopWeek = () => tinygrailStore.fetchTopWeek()

  // -------------------- get --------------------
  @computed get topWeek() {
    return tinygrailStore.topWeek
  }
}
