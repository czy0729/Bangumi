/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:33:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 04:25:14
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE, STATE } from './ds'

export default class ScreenBiWeekly extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return true
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
