/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:33:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-19 22:36:53
 *
 * 条目封面一览页面状态机
 */
import Action from './action'
import { RESET_STATE } from './ds'

/** 条目封面一览页面状态机 */
export default class ScreenOverview extends Action {
  init = () => {
    this.setState({
      _loaded: true
    })
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
