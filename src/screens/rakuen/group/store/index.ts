/*
 * @Author: czy0729
 * @Date: 2019-07-13 18:49:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-28 00:00:00
 *
 * 页面 Store 入口: init() / unmount()
 */
import Action from './action'
import { RESET_STATE } from './ds'

import type { STATE } from './ds'

export default class ScreenGroup extends Action {
  init = async () => {
    const storageData = (await this.getStorageOnce<typeof STATE>(this.key)) as typeof STATE & {
      /** 旧版本持久化过, 已废弃 */
      history?: unknown
    }

    // 只在运行时丢弃, 不迁移存储 (下一次 save 后自然消失)
    delete storageData.history

    this.setState({
      ...storageData,
      ...RESET_STATE,
      _loaded: true
    })

    // setState 对 observable 对象是逐键合并, 空对象清不掉旧快照, 需要整体置换
    this.clearState('ota')

    this.fetchPage(this.state.page, this.state.page)
    return this.fetchGroupInfo()
  }

  /** 页面离开还原状态 */
  unmount = () => {
    this.setState(RESET_STATE)
  }
}
