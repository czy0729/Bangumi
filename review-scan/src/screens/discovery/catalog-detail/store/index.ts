/*
 * @Author: czy0729
 * @Date: 2020-01-05 22:24:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-29 19:44:32
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE, STATE } from './ds'

export default class ScreenCatalogDetail extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchCatalogDetail()
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
