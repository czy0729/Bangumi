/*
 * @Author: czy0729
 * @Date: 2023-04-26 15:25:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-03 13:52:21
 */
import Action from './action'
import { EXCLUDE_STATE } from './ds'

/** 搜索页面状态机 */
export default class ScreenDollars extends Action {
  init = async () => {
    this.setState({
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchDollars()
  }
}
