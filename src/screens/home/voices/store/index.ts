/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 20:53:12
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE, STATE } from './ds'

export default class ScreenVoices extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.onHeaderRefresh()
  }

  onHeaderRefresh = () => {
    return this.fetchMonoVoices()
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
