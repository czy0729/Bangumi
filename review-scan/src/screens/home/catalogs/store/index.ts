/*
 * @Author: czy0729
 * @Date: 2024-11-09 07:18:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-04 20:15:11
 */
import Action from './action'
import { RESET_STATE } from './ds'

/** 条目目录页面状态机 */
export default class ScreenSubjectCatalogs extends Action {
  init = () => {
    this.setState({
      _loaded: true
    })

    return this.onHeaderRefresh()
  }

  onHeaderRefresh = () => {
    return this.fetchSubjectCatalogs(true)
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
