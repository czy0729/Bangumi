/*
 * @Author: czy0729
 * @Date: 2024-08-21 17:14:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 17:14:44
 */
import Action from './action'
import { RESET_STATE } from './ds'

export default class ScreenStaff extends Action {
  init = () => {
    this.setState({
      _loaded: true
    })

    return this.fetchCatalogs(true)
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
