/*
 * @Author: czy0729
 * @Date: 2019-04-27 13:09:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 超展开页 Store 入口: 初始化
 */
import Action from './action'
import { DELAY_MOUNTED, EXCLUDE_STATE, INIT_PREFETCH_STATE, NAMESPACE } from './ds'

import type { STATE } from './ds'

export default class ScreenRakuen extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...INIT_PREFETCH_STATE,
      ...EXCLUDE_STATE,
      _loaded: true
    })
    this.fetchRakuen()

    // 延迟加载标记
    setTimeout(() => {
      this.setState({
        _mounted: true
      })
    }, DELAY_MOUNTED)

    return true
  }
}
