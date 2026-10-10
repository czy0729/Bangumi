/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:05:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:20:00
 *
 * 索引页面初始化与卸载
 */
import Action from './action'
import { DATE, EXCLUDE_STATE, NAMESPACE, RESET_STATE } from './ds'

import type { STATE } from './ds'

/** 索引页面状态机 */
export default class ScreenBrowser extends Action {
  /** 初始化, 恢复上次筛选条件 */
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    if (!this.state._loaded) {
      // 空字符串代表不筛选, 只在无缓存值时填默认值
      if (storageData.airtime === undefined) storageData.airtime = DATE.getFullYear()
      if (storageData.month === undefined) storageData.month = DATE.getMonth() + 1
    }

    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchBrowser(true)
  }

  unmount = () => {
    this.scrollToOffset = null
    this.setState(RESET_STATE)
  }
}
