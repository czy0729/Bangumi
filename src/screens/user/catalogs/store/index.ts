/*
 * @Author: czy0729
 * @Date: 2020-03-22 18:47:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 15:16:22
 *
 * 页面初始化与卸载
 */
import { TABS } from '../ds'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE } from './ds'

import type { STATE } from './ds'

/** 用户目录页面状态机 */
export default class ScreenCatalogs extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)

    /** 缓存的页码可能因标签调整而越界, 恢复时收敛到有效范围 */
    const page = Math.min(Number(storageData?.page) || 0, TABS.length - 1)
    this.setState({
      ...storageData,
      page,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchCatalogs(this.key, true)
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
