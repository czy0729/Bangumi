/*
 * @Author: czy0729
 * @Date: 2024-08-27 10:19:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-27 13:04:07
 */
import Action from './action'

/** 制作人员页面状态机 */
class ScreenPersons extends Action {
  init = () => {
    this.setState({
      _loaded: true
    })

    return this.fetchPersons()
  }
}

export default ScreenPersons
