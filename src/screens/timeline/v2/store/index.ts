/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:58:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-31 00:00:00
 *
 * 时间胶囊页 Store 入口: 初始化
 */
import { TABS } from '../ds'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

import type { STATE } from './ds'

export default class ScreenTimeline extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)

    // 板块数量变化过, 越界时回到第一个
    let page = storageData?.page || 0
    if (page >= TABS.length) page = 0

    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      page,
      renderedTabsIndex: [page],
      _loaded: true
    })

    return this.fetchTimeline(true)
  }
}
