/*
 * @Author: czy0729
 * @Date: 2024-08-20 14:50:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-20 15:07:08
 */
import Action from './action'

/** 频道页面状态机 */
export default class ScreenChannel extends Action {
  init = () => {
    this.setState({
      type: this.type
    })

    return this.fetchChannel()
  }
}
