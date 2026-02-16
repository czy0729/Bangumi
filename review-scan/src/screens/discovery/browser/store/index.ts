/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:05:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-25 08:21:24
 */
import Action from './action'
import { DATE, EXCLUDE_STATE, NAMESPACE, RESET_STATE, STATE } from './ds'

export default class ScreenBrowser extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      airtime: storageData.airtime || DATE.getFullYear(),
      month: storageData.month || DATE.getMonth() + 1,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchBrowser(true)
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchBrowser(true)
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
