/*
 * @Author: czy0729
 * @Date: 2020-03-22 18:47:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 页面初始化与卸载
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE } from './ds'

import type { STATE } from './ds'

/** 用户目录页面状态机 */
export default class ScreenCatelogs extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchCatalogs(this.key, true)
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
