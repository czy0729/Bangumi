/*
 * @Author: czy0729
 * @Date: 2024-12-03 13:43:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-13 22:47:10
 *
 * Dollars 数据获取与自动刷新
 */
import { discoveryStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 首次获取留言板数据 */
  fetchDollars = () => {
    return discoveryStore.fetchDollars()
  }

  /** 增量刷新留言板数据 (未开启自动刷新时忽略) */
  updateDollars = () => {
    if (!this.state.autoRefresh) return false

    return discoveryStore.updateDollars()
  }
}
