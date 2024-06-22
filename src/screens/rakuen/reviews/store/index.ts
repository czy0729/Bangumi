/*
 * @Author: czy0729
 * @Date: 2021-07-15 17:28:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-22 16:43:48
 */
import Action from './action'

/** 影评页面状态机 */
class ScreenBoard extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(this.key)),
      ota: {},
      _loaded: true
    })

    return this.initFetch()
  }
}

export default ScreenBoard
