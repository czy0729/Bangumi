/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 05:19:21
 *
 * 发现页 store 入口: 定义 init() 与状态恢复
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

import type { STATE } from './ds'

export default class ScreenDiscovery extends Action {
  /** 初始化 */
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    await this.initFetch()

    return true
  }
}
