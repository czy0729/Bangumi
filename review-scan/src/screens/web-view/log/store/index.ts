/*
 * @Author: czy0729
 * @Date: 2025-02-19 07:52:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-23 14:56:31
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class ScreenLog extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    this.getData()
  }
}
