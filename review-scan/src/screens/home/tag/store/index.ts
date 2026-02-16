/*
 * @Author: czy0729
 * @Date: 2024-06-03 07:55:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-20 10:39:58
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE, STATE } from './ds'

/** 标签条目页面状态机 */
export default class ScreenTag extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)

    // 这个标签页面的按排名排序已经毫无意义, 所以默认改为按收藏
    if (storageData.order === 'rank') storageData.order = 'collects'

    const state = {
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    }

    const { airtime } = this.params
    if (airtime) state.airtime = airtime
    this.setState(state)

    return this.fetchTag(true)
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
