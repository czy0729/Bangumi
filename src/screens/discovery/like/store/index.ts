/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:41:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 12:00:00
 *
 * 猜你喜欢页面初始化与卸载
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

      // 快照可能被历史版本或失败的请求落盘成 null, 入口归一, 避免后续 `in` / 下标访问抛错中断 getList
      snapshotLikes: storageData.snapshotLikes || {},
      snapshotSubjects: storageData.snapshotSubjects || {},

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
