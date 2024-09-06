/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-06 01:17:11
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

class ScreenWorks extends Action {
  init = async () => {
    this.setState({
      ...((await this.getStorage(NAMESPACE)) || {}),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchMonoWorks(true)
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchMonoWorks(true)
  }
}

export default ScreenWorks
