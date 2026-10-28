/*
 * @Author: czy0729
 * @Date: 2021-07-15 17:28:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-28 00:00:00
 *
 * 影评页面状态机
 */
import Action from './action'
import { EXCLUDE_STATE, RESET_STATE } from './ds'

import type { STATE } from './ds'

/** 影评页面状态机 */
export default class ScreenReviews extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(this.key)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    // setState 对 observable 对象是逐键合并, 空对象清不掉旧快照, 需要整体置换
    this.clearState('ota')

    return this.initFetch()
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
