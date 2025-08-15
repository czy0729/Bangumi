/*
 * @Author: czy0729
 * @Date: 2024-12-02 10:10:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 10:11:00
 */
import Action from './action'
import { EXCLUDE_STATE, RESET_STATE } from './ds'

export default class ScreenVIB extends Action {
  init = () => {
    this.setState({
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return true
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
