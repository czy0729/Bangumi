/*
 * @Author: czy0729
 * @Date: 2020-07-28 10:22:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-21 12:00:00
 *
 * 用户评分页面状态机: 恢复缓存页码 (路由 status 优先) 并按需拉取
 */
import { TABS } from '../ds'
import Action from './action'
import { NAMESPACE } from './ds'

import type { STATE } from './ds'

export default class ScreenRating extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE>(NAMESPACE)
    const { status } = this.params
    if (status) {
      // status 与 TABS 的 key 同源, 直接按 key 定位; 下标可能为 0, 不能用 || 兜底
      const page = TABS.findIndex(item => item.key === status)
      if (page >= 0) storageData.page = page
    }

    this.setState({
      ...storageData,
      _fetching: false,
      _loaded: true
    })

    if (!this.rating(this.status)._loaded) return this.fetchRating(true)

    return true
  }
}
