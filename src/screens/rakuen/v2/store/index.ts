/*
 * @Author: czy0729
 * @Date: 2019-04-27 13:09:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 超展开页 Store 入口: 初始化
 */
import { userStore } from '@stores'
import { TABS } from '../ds'
import Action from './action'
import { DELAY_MOUNTED, EXCLUDE_STATE, INIT_PREFETCH_STATE, NAMESPACE } from './ds'

import type { STATE } from './ds'

export default class ScreenRakuen extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    const { wataame, ...rest } = storageData

    // 上次请求失败也保留列表, 清掉失败标记即可, 避免离线重启无数据
    const cached =
      wataame && wataame._userId === userStore.myId
        ? { wataame: { ...wataame, _error: false, _moreError: false } }
        : {}

    this.setState({
      ...rest,
      ...cached,
      ...INIT_PREFETCH_STATE,
      ...EXCLUDE_STATE,
      page: Math.min(Math.max(rest.page ?? 1, 0), TABS.length - 1),
      _loaded: true
    })
    this.fetchRakuen()

    // 延迟加载标记
    setTimeout(() => {
      this.setState({
        _mounted: true
      })
    }, DELAY_MOUNTED)

    return true
  }
}
