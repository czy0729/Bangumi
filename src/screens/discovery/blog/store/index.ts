/*
 * @Author: czy0729
 * @Date: 2024-08-09 03:20:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 05:42:54
 */
import { TABS } from '../ds'
import Action from './action'
import { NAMESPACE, STATE } from './ds'

class ScreenDiscoveryBlog extends Action {
  init = async () => {
    const state: typeof STATE = await this.getStorage(NAMESPACE)
    const { type } = this.params
    if (type) {
      const page = TABS.findIndex(item => item.key === type)
      if (page !== -1) state.page = 0
    }

    this.setState({
      ...state,
      show: true,
      _loaded: true
    })

    return this.fetchBlog()
  }
}

export default ScreenDiscoveryBlog
