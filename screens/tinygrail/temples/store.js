/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-25 16:40:07
 */
import { computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'

export default class ScreenTinygrailTemples extends store {
  onHeaderRefresh = () => this.fetchTempleLast(true)

  fetchTempleLast = refresh => tinygrailStore.fetchTempleLast(refresh)

  // -------------------- get --------------------
  @computed get templeLast() {
    return tinygrailStore.templeLast
  }
}
