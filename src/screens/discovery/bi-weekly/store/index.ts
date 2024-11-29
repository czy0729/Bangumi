/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:33:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 04:25:14
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

class ScreenBiWeekly extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return true
  }
}

export default ScreenBiWeekly
