/*
 * @Author: czy0729
 * @Date: 2020-07-28 10:22:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-26 08:30:09
 */
import { STATUS_MAP, TABS } from '../ds'
import Action from './action'
import { NAMESPACE } from './ds'

/** 用户评分页面状态机 */
class ScreenRating extends Action {
  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    const { status } = this.params
    if (status) state.page = STATUS_MAP[status] || 2
    this.setState({
      ...state,
      _fetching: false,
      _loaded: true
    })

    const { page } = this.state
    if (!this.rating(TABS[page].key)._loaded) return this.fetchRating(true)

    return true
  }
}

export default ScreenRating
