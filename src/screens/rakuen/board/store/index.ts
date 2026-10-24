/*
 * @Author: czy0729
 * @Date: 2021-04-07 10:23:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 页面 Store 入口: init() 与初始化编排
 */
import Action from './action'

import type { STATE } from './ds'

export default class ScreenBoard extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE>(this.key)
    this.setState({
      ...storageData,
      ota: {},
      _loaded: true
    })

    return this.fetchBoard()
  }
}
