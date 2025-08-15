/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-02 11:47:37
 */
import { computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'

export default class ScreenTinygrailTemples extends store<null> {
  onHeaderRefresh = () => {
    return this.fetchTempleLast(true)
  }

  fetchTempleLast = (refresh: boolean = false) => {
    return tinygrailStore.fetchTempleLast(refresh)
  }

  // -------------------- get --------------------
  /** 最近圣殿 */
  @computed get templeLast() {
    return tinygrailStore.templeLast
  }
}
