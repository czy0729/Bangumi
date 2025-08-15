/*
 * @Author: czy0729
 * @Date: 2024-05-16 19:56:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 20:00:46
 */
import { rakuenStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  fetchRakuen = async () => {
    const type = this.type(this.state.page)
    return type === 'hot'
      ? rakuenStore.fetchRakuenHot()
      : rakuenStore.fetchRakuen({
          scope: this.state.scope,
          type
        })
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchRakuen()
  }
}
