/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:33:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-19 22:36:53
 */
import Action from './action'

class ScreenOverview extends Action {
  init = () => {
    this.setState({
      _loaded: true
    })
  }
}

export default ScreenOverview
