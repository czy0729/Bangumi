/*
 * @Author: czy0729
 * @Date: 2025-02-19 07:52:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-20 05:16:02
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class ScreenLog extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    this.getData()
  }
}
