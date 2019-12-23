/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-23 14:09:20
 */
import { computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'

export default class ScreenTinygrailTemples extends store {
  fetchTempleLast = () => tinygrailStore.fetchTempleLast()

  // -------------------- get --------------------
  @computed get templeLast() {
    return tinygrailStore.templeLast
  }
}
