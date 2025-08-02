/*
 * @Author: czy0729
 * @Date: 2025-07-26 21:36:07
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-07-26 21:36:07
 */
import { tinygrailStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 每周萌王 */
  fetchTopWeek = () => {
    return tinygrailStore.fetchTopWeek()
  }

  /** 历史萌王 */
  fetchTopWeekHistory = () => {
    const { prev } = this.state
    if (!prev) return

    return tinygrailStore.fetchTopWeekHistory(prev)
  }
}
