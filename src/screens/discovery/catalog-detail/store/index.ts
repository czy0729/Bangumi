/*
 * @Author: czy0729
 * @Date: 2020-01-05 22:24:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-29 19:44:32
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

class ScreenCatalogDetail extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchCatalogDetail()
  }
}

export default ScreenCatalogDetail
