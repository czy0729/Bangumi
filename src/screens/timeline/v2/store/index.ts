/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:58:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-27 10:58:28
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

class ScreenTimeline extends Action {
  init = async () => {
    const state = await this.getStorage(NAMESPACE)
    let page = state?.page || 0
    if (page >= 4) page = 0

    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      page,
      renderedTabsIndex: [page],
      _loaded: true
    })

    setTimeout(() => {
      this.fetchTimeline(true)
    }, 0)

    return true
  }
}

export default ScreenTimeline
