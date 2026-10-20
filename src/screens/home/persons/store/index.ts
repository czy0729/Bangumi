/*
 * @Author: czy0729
 * @Date: 2024-08-27 10:19:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-27 13:04:07
 *
 * 制作人员页面状态机
 */
import Action from './action'
import { RESET_STATE } from './ds'

export default class ScreenPersons extends Action {
  init = () => {
    this.setState({
      _loaded: true
    })

    return this.fetchPersons()
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
