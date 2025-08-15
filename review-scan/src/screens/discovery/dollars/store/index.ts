/*
 * @Author: czy0729
 * @Date: 2023-04-26 15:25:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-13 22:51:56
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE, STATE } from './ds'

/** 搜索页面状态机 */
export default class ScreenDollars extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchDollars()
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
