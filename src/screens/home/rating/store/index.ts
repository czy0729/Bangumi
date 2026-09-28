/*
 * @Author: czy0729
 * @Date: 2020-07-28 10:22:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 页面初始化: 恢复缓存页码 (路由 status 优先) 并按需拉取
 */
import { STATUS_MAP, TABS } from '../ds'
import Action from './action'
import { NAMESPACE } from './ds'

import type { STATE } from './ds'

/** 用户评分页面状态机 */
export default class ScreenRating extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE>(NAMESPACE)
    const { status } = this.params
    if (status) {
      storageData.page = STATUS_MAP[status as keyof typeof STATUS_MAP] || 2
    }

    this.setState({
      ...storageData,
      _fetching: false,
      _loaded: true
    })

    const { page } = this.state
    if (!this.rating(TABS[page].key)._loaded) return this.fetchRating(true)

    return true
  }
}
