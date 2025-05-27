/*
 * @Author: czy0729
 * @Date: 2024-08-09 03:20:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 05:42:54
 */
import { TABS } from '../ds'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE, STATE } from './ds'

export default class ScreenDiscoveryBlog extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    const { type } = this.params
    if (type) {
      const page = TABS.findIndex(item => item.key === type)
      if (page !== -1) storageData.page = 0
    }

    this.setState({
      ...storageData,
      show: true,
      _loaded: true
    })

    return this.fetchBlog()
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
