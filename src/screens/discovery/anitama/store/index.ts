/*
 * @Author: czy0729
 * @Date: 2019-06-24 19:35:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-07 22:43:58
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE } from './ds'

import type { STATE } from './ds'

export default class ScreenAnitama extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      show: true,
      _loaded: true
    })

    // 首次启动使用页码 1, 再次进入页面使用之前的页码
    if (!this.prevPage) {
      this.prevPage = this.state.page
    } else {
      this.setState({
        page: Number(this.prevPage),
        ipt: String(this.prevPage)
      })
    }

    this.fetchList()

    return true
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
