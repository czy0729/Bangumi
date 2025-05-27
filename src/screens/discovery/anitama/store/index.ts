/*
 * @Author: czy0729
 * @Date: 2019-06-24 19:35:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-07 22:43:58
 */
import Action from './action'
import { RESET_STATE } from './ds'

export default class ScreenAnitama extends Action {
  unmount = () => {
    this.setState(RESET_STATE)
  }
}
