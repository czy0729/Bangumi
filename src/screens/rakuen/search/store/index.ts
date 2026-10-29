/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:20:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 *
 * 页面 Store 入口: init() / unmount()
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE } from './ds'

import type { STATE } from './ds'

export default class ScreenRakuenSearch extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)

    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      // 历史可能是旧版本数据, 做一次类型兜底
      history: Array.isArray(storageData.history) ? storageData.history : [],
      _loaded: true
    })
  }

  unmount = () => {
    // searching 是瞬态: 退出时请求可能还在进行, 不复位会让下次进入无法搜索
    this.setState({
      ...RESET_STATE,
      searching: false
    })
  }
}
