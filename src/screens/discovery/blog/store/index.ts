/*
 * @Author: czy0729
 * @Date: 2024-08-09 03:20:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 03:21:07
 */
import Action from './action'
import { NAMESPACE } from './ds'

class ScreenDiscoveryBlog extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      show: true,
      _loaded: true
    })

    return this.fetchBlog()
  }
}

export default ScreenDiscoveryBlog
