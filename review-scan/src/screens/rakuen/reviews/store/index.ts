/*
 * @Author: czy0729
 * @Date: 2021-07-15 17:28:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-22 16:43:48
 */
import Action from './action'
import { EXCLUDE_STATE, RESET_STATE, STATE } from './ds'

/** 影评页面状态机 */
export default class ScreenBoard extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(this.key)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      ota: {},
      _loaded: true
    })

    return this.initFetch()
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
