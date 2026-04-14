/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:41:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-14 09:49:35
 */
import Action from './action'
import { EXCLUDE_STATE, RESET_STATE } from './ds'

import type { STATE } from './ds'

export default class ScreenLike extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(
      this.namespace
    )
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })
    this.getList()

    return true
  }

  /** 刷新 */
  onHeaderRefresh = () => {
    return this.getList(true)
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
