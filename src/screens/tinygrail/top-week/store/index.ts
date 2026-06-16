/*
 * @Author: czy0729
 * @Date: 2025-07-26 21:40:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-16 01:55:38
 */
import { getTimestamp, postTask } from '@utils'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class ScreenTinygrailTopWeek extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: getTimestamp()
    })

    return this.headerRefresh()
  }

  /** 下拉刷新 */
  headerRefresh = () => {
    postTask(() => {
      this.fetchAuction()
    })
    return this.fetchTopWeek()
  }
}
