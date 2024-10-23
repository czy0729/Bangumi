/*
 * @Author: czy0729
 * @Date: 2024-06-03 07:55:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-20 10:39:58
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

/** 标签条目页面状态机 */
class ScreenTag extends Action {
  init = async () => {
    const state: typeof STATE = (await this.getStorage(NAMESPACE)) || {}

    // 这个标签页面的按排名排序已经毫无意义, 所以默认改为按收藏
    if (state.order === 'rank') state.order = 'collects'

    const _state = {
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    }

    const { airtime } = this.params
    if (airtime) _state.airtime = airtime
    this.setState(_state)

    return this.fetchTag(true)
  }
}

export default ScreenTag
