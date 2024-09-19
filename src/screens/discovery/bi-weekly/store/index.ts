/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:33:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-19 22:47:38
 */
import Action from './action'

class ScreenBiWeekly extends Action {
  init = () => {
    this.setState({
      _loaded: true
    })
  }
}

export default ScreenBiWeekly
