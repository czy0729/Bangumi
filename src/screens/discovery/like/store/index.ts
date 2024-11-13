/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:41:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-13 08:51:01
 */
import Action from './action'
import { EXCLUDE_STATE } from './ds'

export default class ScreenLike extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(this.namespace)),
      ...EXCLUDE_STATE,
      _loaded: true
    })
    this.getList()

    return true
  }

  /** 刷新 */
  onHeaderRefresh = () => {
    return this.getList(true)
  }
}
