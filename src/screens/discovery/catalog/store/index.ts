/*
 * @Author: czy0729
 * @Date: 2020-01-02 16:52:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-29 20:29:07
 */
import { get } from '@utils/protobuf'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

class ScreenCatalog extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      loadedCatalog: !!get('catalog')?.length,
      _loaded: true
    })

    return this.fetchCatalog()
  }
}

export default ScreenCatalog
